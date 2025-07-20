import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { InterserviceService } from '../interservice/interservice.service';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly interserviceService: InterserviceService,
  ) {}

  private generateVerificationCode(): string {
    // Génère un nombre aléatoire entre 10000 et 99999
    const code = Math.floor(10000 + Math.random() * 90000);
    return code.toString();
  }

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const { order_id, user_id, transport_mode_id, delivery_status_id } =
      createDeliveryDto;

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

    const savedDelivery: Delivery =
      await this.deliveryRepository.save(delivery);

    // Publish delivery-created event to Kafka
    await this.kafkaProducerService.sendMessage('delivery-created', {
      orderId: order_id,
      delivererId: user_id,
      deliveryId: savedDelivery.id,
    });

    return savedDelivery;
  }

  async findAll() {
    return await this.deliveryRepository.find({
      relations: ['transport_mode', 'delivery_status'],
    });
  }

  async findOne(id: number) {
    return await this.deliveryRepository.findOne({
      where: { id },
      relations: ['transport_mode', 'delivery_status'],
    });
  }

  async calculateLivreurRevenueWithOrders(
    livreurId: number,
  ): Promise<{ livreurId: number; totalRevenue: number; orders: any[] }> {
    const deliveries = await this.deliveryRepository.find({
      where: {
        user_id: livreurId,
        delivery_status: { name: 'Delivered' }
      },
      relations: ['delivery_status'], 
    });

    let totalRevenue = 0;
    const associatedOrders: any[] = [];

    for (const delivery of deliveries) {
      if (delivery.order_id) {
        const order = await this.interserviceService.fetchOrder(delivery.order_id);
        if (order) {
          associatedOrders.push(order);

          totalRevenue += order.subtotal*0.10 || 0;
        }
      }
    }

    return { livreurId, totalRevenue, orders: associatedOrders };
  }

  async verifyDeliveryCode(deliveryId: number, code: string): Promise<boolean> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new NotFoundException(
        `Livraison avec l'ID ${deliveryId} non trouvée.`,
      );
    }

    // Comparaison insensible à la casse et aux espaces si nécessaire, mais pour un code numérique, une comparaison stricte est préférable
    if (!code || code.length !== 5 || !/^\d{5}$/.test(code)) {
      throw new BadRequestException(
        'Le code de vérification doit être une chaîne de 5 chiffres.',
      );
    }

    return delivery.verification_code === code;
  }

}
