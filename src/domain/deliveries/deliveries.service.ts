import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { InterserviceService } from '../interservice/interservice.service';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly interserviceService: InterserviceService,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const { order_id, user_id, transport_mode_id, delivery_status_id } = createDeliveryDto;

    const order = await this.interserviceService.fetchOrder(order_id);
    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${order_id} non trouvée`);
    }

    if (order.status_id !== 2) {
      throw new BadRequestException('La commande doit être au statut 2 pour créer une livraison');
    }

    const delivery = this.deliveryRepository.create({
      order_id,
      user_id,
      transport_mode_id,
      delivery_status_id,
      verification_code: this.generateVerificationCode(),
      start_time: new Date(),
      end_time: null,
    });

    const saved = await this.deliveryRepository.save(delivery);

    await this.kafkaProducerService.sendMessage('delivery-created', {
      orderId: order_id,
      delivererId: user_id,
      deliveryId: saved.id,
    });

    return saved;
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find({
      relations: ['transport_mode', 'delivery_status'],
    });
  }

  async findOne(id: number, user?: JwtPayloadType): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['transport_mode', 'delivery_status'],
    });

    if (!delivery) {
      throw new NotFoundException('Livraison non trouvée');
    }

    if (user?.role === 'deliverer' && delivery.user_id !== user.id) {
      throw new ForbiddenException('Accès interdit à cette livraison');
    }

    return delivery;
  }

  async calculateLivreurRevenueWithOrders(
    livreurId: number,
    user?: JwtPayloadType,
  ): Promise<{ livreurId: number; totalRevenue: number; orders: any[] }> {
    if (user?.role === 'deliverer' && user.id !== livreurId) {
      throw new ForbiddenException('Accès interdit aux revenus d\'un autre livreur');
    }

    const deliveries = await this.deliveryRepository.find({
      where: { user_id: livreurId, delivery_status_id: 2 },
    });

    let totalRevenue = 0;
    const associatedOrders: any[] = [];

    for (const delivery of deliveries) {
      if (delivery.order_id) {
        const order = await this.interserviceService.fetchOrder(delivery.order_id);
        if (order) {
          associatedOrders.push(order);
          totalRevenue += order.subtotal * 0.1 || 0;
        }
      }
    }

    return { livreurId, totalRevenue, orders: associatedOrders };
  }

  async verifyDeliveryCode(
    deliveryId: number,
    code: string,
    user?: JwtPayloadType,
  ): Promise<{ isValid: boolean }> {
    const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });

    if (!delivery) {
      throw new NotFoundException(`Livraison avec l'ID ${deliveryId} non trouvée`);
    }

    if (user?.role === 'deliverer' && delivery.user_id !== user.id) {
      throw new ForbiddenException('Accès interdit à cette livraison');
    }

    if (!code || code.length !== 5 || !/^\d{5}$/.test(code)) {
      throw new BadRequestException('Le code de vérification doit être une chaîne de 5 chiffres');
    }

    return { isValid: delivery.verification_code === code };
  }

  async findByOrderId(orderId: number): Promise<Delivery | null> {
    return this.deliveryRepository.findOne({
      where: { order_id: orderId },
      relations: ['transport_mode', 'delivery_status'],
    });
  }
}
