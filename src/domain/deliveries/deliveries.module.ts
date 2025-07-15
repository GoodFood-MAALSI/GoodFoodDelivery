import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Delivery } from './entities/delivery.entity';
import { DeliveriesController } from './deliveries.controller';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { DeliveriesService } from './deliveries.service';
import { InterserviceService } from '../interservice/interservice.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    HttpModule,
    ConfigModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, KafkaProducerService, InterserviceService],

})
export class DeliveriesModule {}