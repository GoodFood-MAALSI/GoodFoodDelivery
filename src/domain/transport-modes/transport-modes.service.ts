import { Injectable, NotFoundException } from '@nestjs/common';
import { TransportMode } from './entities/transport-mode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransportModesService {
  constructor(
    @InjectRepository(TransportMode)
    private readonly transportModeRepository: Repository<TransportMode>,
  ) {}

  async findAll() {
    return await this.transportModeRepository.find();
  }
}
