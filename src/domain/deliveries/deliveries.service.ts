import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportMode } from '../transport-modes/entities/transport-mode.entity';
import { DeliveryStatus } from '../delivery-status/entities/delivery-status.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(TransportMode)
    private readonly transportModeRepository: Repository<TransportMode>,
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = this.deliveryRepository.create(createDeliveryDto);
    return await this.deliveryRepository.save(delivery);
  }

  async findAll() {
    return await this.deliveryRepository.find();
  }

  async findOne(id: number) {
    return await this.deliveryRepository.findOne({
      where: { id },
      relations: ['transport_mode', 'deliveryStatus'],
    });
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.findOne(id);

    if (!delivery) {
      throw new NotFoundException();
    }

    Object.assign(delivery, updateDeliveryDto);
    return await this.deliveryRepository.save(delivery);
  }

  async remove(id: number) {
    const delivery = await this.findOne(id);

    if (!delivery) {
      throw new NotFoundException();
    }
    return await this.deliveryRepository.remove(delivery);
  }


  async setDeliveryTransportMode(deliveryId: number, transportModeId: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
    const transportMode = await this.transportModeRepository.findOne({ where: { id: transportModeId } });

    if (!delivery || !transportMode) {
      throw new NotFoundException('Delivery or Transport Mode not found');
    }

    delivery.transport_mode = transportMode;
    return this.deliveryRepository.save(delivery);
  }

  async setDeliveryStatus(deliveryId: number, deliveryStatusId: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
    const deliveryStatus = await this.deliveryStatusRepository.findOne({ where: { id: deliveryStatusId } });

    if (!delivery || !deliveryStatus) {
      throw new NotFoundException('Delivery or Delivery Status not found');
    }

    delivery.deliveryStatus = deliveryStatus;
    return this.deliveryRepository.save(delivery);
  }

  async updateDeliveryStatus(deliveryId: number, deliveryStatusId: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id: deliveryId },
      relations: ['deliveryStatus'], // Chargez la relation deliveryStatus
    });

    if (!delivery) {
      throw new NotFoundException(`Livraison avec l'ID ${deliveryId} non trouvée`);
    }

    const deliveryStatus = await this.deliveryStatusRepository.findOne({
      where: { id: deliveryStatusId },
    });

    if (!deliveryStatus) {
      throw new NotFoundException(`Statut de livraison avec l'ID ${deliveryStatusId} non trouvé`);
    }

    delivery.deliveryStatus = deliveryStatus;
    return this.deliveryRepository.save(delivery);
  }
}
