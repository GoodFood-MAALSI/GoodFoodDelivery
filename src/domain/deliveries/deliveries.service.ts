import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportMode } from '../transport-modes/entities/transport-mode.entity';
import { DeliveryStatus } from '../delivery-status/entities/delivery-status.entity';
import { ClientKafka } from '@nestjs/microservices';
import { OrdersService } from '../order/order.service';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Injectable()
export class DeliveriesService implements OnModuleInit { 
  constructor(
    private readonly ordersService: OrdersService,
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(TransportMode)
    private readonly transportModeRepository: Repository<TransportMode>,
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
    // @Inject('KAFKA_CLIENT_ORDERS') private readonly clientOrdersKafka: ClientKafka, 
  ) {}

  async onModuleInit() {
    // await this.clientOrdersKafka.connect();
  }

    private generateVerificationCode(): string {
    // Génère un nombre aléatoire entre 10000 et 99999
    const code = Math.floor(10000 + Math.random() * 90000);
    return code.toString();
  }

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = this.deliveryRepository.create(createDeliveryDto);
    delivery.verification_code = this.generateVerificationCode();
    return await this.deliveryRepository.save(delivery);
  }

  async findAll() {
    return await this.deliveryRepository.find(
      {
        relations: ['transport_mode', 'delivery_status'],
      }
    );
  }

  async findOne(id: number) {
    return await this.deliveryRepository.findOne({
      where: { id },
      relations: ['transport_mode', 'delivery_status'],
    });
  }


    async calculateLivreurRevenue(livreurId: number): Promise<number> {
    let totalRevenue = 0;

    const deliveries = await this.deliveryRepository.find({ where: { user_id : livreurId } });

    for (const delivery of deliveries) {
      const order = await this.ordersService.getOrderById(delivery.order_id);
      if (order && order.price) {
        totalRevenue += order.price*0.1; 
      }
    }

    return totalRevenue;
  }

    async verifyDeliveryCode(deliveryId: number, code: string): Promise<boolean> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new NotFoundException(`Livraison avec l'ID ${deliveryId} non trouvée.`);
    }

    // Comparaison insensible à la casse et aux espaces si nécessaire, mais pour un code numérique, une comparaison stricte est préférable
    if (!code || code.length !== 5 || !/^\d{5}$/.test(code)) {
        throw new BadRequestException('Le code de vérification doit être une chaîne de 5 chiffres.');
    }

    return delivery.verification_code === code;
  }


  // /**
  //  * Accepte une commande, met à jour son statut de livraison en base de données,
  //  * puis émet un événement Kafka.
  //  * @param orderId L'ID de la commande à accepter.
  //  * @returns La livraison mise à jour.
  //  */
  // async acceptOrderByOrderId(orderId: number): Promise<Delivery> {
  //   // 1. Trouver la livraison par order_id
  //   const delivery = await this.deliveryRepository.findOne({
  //     where: { order_id: orderId },
  //     relations: ['delivery_status'],
  //   });

  //   if (!delivery) {
  //     throw new NotFoundException(`Delivery for order ID ${orderId} not found.`);
  //   }

  //   // 2. Trouver le statut "Accepté"
  //   const ACCEPTED_DELIVERY_STATUS_ID = 2; // REMPLACEZ PAR L'ID RÉEL DE VOTRE STATUT "Accepté"
  //   const acceptedStatus = await this.deliveryStatusRepository.findOne({
  //     where: { id: ACCEPTED_DELIVERY_STATUS_ID },
  //   });

  //   if (!acceptedStatus) {
  //     throw new NotFoundException(`"Accepted" Delivery Status (ID: ${ACCEPTED_DELIVERY_STATUS_ID}) not found in database. Please ensure it exists.`);
  //   }

  //   // 3. Mettre à jour le statut de la livraison et l'heure de début
  //   delivery.deliveryStatus = acceptedStatus;
  //   // Si votre entité Delivery a une colonne 'start_time', mettez-la à jour ici
  //   // delivery.start_time = new Date();

  //   // 4. Sauvegarder la livraison mise à jour en base de données
  //   const updatedDelivery = await this.deliveryRepository.save(delivery);

  //   // 5. Émettre un événement Kafka APRÈS que la BDD a été mise à jour
  //   this.clientOrdersKafka.emit('client-orders', {
  //     eventType: 'order.accepted',
  //     orderId: updatedDelivery.order_id,
  //     deliveryId: updatedDelivery.id, // Inclure l'ID de la livraison si pertinent
  //     timestamp: new Date().toISOString(),
  //     newStatus: acceptedStatus.name, // Ex: 'Accepted'
  //   });

  //   return updatedDelivery;
  // }
}