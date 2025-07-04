import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Delivery} from './entities/delivery.entity'
import { DeliveryStatus } from '../delivery-status/entities/delivery-status.entity';
import { TransportMode } from '../transport-modes/entities/transport-mode.entity';

@Module({
  imports : [DatabaseModule,TypeOrmModule.forFeature([Delivery]),TypeOrmModule.forFeature([DeliveryStatus]),TypeOrmModule.forFeature([TransportMode])],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
