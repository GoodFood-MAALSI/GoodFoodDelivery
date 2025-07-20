import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Delivery } from './entities/delivery.entity';
import { DeliveriesController } from './deliveries.controller';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { DeliveriesService } from './deliveries.service';
import { InterserviceService } from '../interservice/interservice.service';
import { HttpModule } from '@nestjs/axios';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    UsersModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, KafkaProducerService, InterserviceService, InterserviceAuthGuard],
  exports: [InterserviceService, DeliveriesService],

})
export class DeliveriesModule {}