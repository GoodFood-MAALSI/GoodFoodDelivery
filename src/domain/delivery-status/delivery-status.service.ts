import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryStatusService {
    constructor(
          @InjectRepository(DeliveryStatus)
          private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
        ) {}
      
        async create(createDeliveryStatusDto: CreateDeliveryStatusDto) {
          const deliveryStatus = this.deliveryStatusRepository.create(createDeliveryStatusDto)
          return await this.deliveryStatusRepository.save(deliveryStatus);
        }
      
        async findAll() {
          return await this.deliveryStatusRepository.find();
        }
      
        async findOne(id: number) {
          return await this.deliveryStatusRepository.findOne({ where: {id}});
        }
      
        async update(id: number, updateDeliveryStatusDto: UpdateDeliveryStatusDto) {
      
          const deliveryStatus = await this.findOne(id);
      
          if(!deliveryStatus){
            throw new NotFoundException();
          }
      
          Object.assign(deliveryStatus,updateDeliveryStatusDto);
          return await this.deliveryStatusRepository.save(deliveryStatus);
        }
      
        async remove(id: number) {
          const deliveryStatus = await this.findOne(id);
      
          if(!deliveryStatus){
            throw new NotFoundException();
          }
          return await this.deliveryStatusRepository.remove(deliveryStatus);
        }
}
