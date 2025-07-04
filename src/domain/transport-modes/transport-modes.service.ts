import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransportModeDto } from './dto/create-transport-mode.dto';
import { UpdateTransportModeDto } from './dto/update-transport-mode.dto';
import { TransportMode } from './entities/transport-mode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransportModesService {
  constructor(
        @InjectRepository(TransportMode)
        private readonly transportModeRepository: Repository<TransportMode>,
      ) {}
    
      async create(createTransportModeDto: CreateTransportModeDto) {
        const transportMode = this.transportModeRepository.create(createTransportModeDto)
        return await this.transportModeRepository.save(transportMode);
      }
    
      async findAll() {
        return await this.transportModeRepository.find();
      }
    
      async findOne(id: number) {
        return await this.transportModeRepository.findOne({ where: {id}});
      }
    
      async update(id: number, updateTransportModeDto: UpdateTransportModeDto) {
    
        const transportMode = await this.findOne(id);
    
        if(!transportMode){
          throw new NotFoundException();
        }
    
        Object.assign(transportMode,updateTransportModeDto);
        return await this.transportModeRepository.save(transportMode);
      }
    
      async remove(id: number) {
        const transportMode = await this.findOne(id);
    
        if(!transportMode){
          throw new NotFoundException();
        }
        return await this.transportModeRepository.remove(transportMode);
      }
}
