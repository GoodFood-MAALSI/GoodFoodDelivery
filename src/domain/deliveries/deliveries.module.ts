import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Delivery} from './entities/delivery.entity'
import { DeliveryStatus } from '../delivery-status/entities/delivery-status.entity';
import { TransportMode } from '../transport-modes/entities/transport-mode.entity';
import { OrdersService } from '../order/order.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [DatabaseModule,TypeOrmModule.forFeature([Delivery]),TypeOrmModule.forFeature([DeliveryStatus]),TypeOrmModule.forFeature([TransportMode]), HttpModule,
    ConfigModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService,OrdersService],
})
export class DeliveriesModule {}
