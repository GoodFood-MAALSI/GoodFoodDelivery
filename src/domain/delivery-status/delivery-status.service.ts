import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryStatusService {
  constructor(
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async findAll() {
    return await this.deliveryStatusRepository.find();
  }
}
