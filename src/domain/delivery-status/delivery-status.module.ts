import { Module } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { DeliveryStatusController } from './delivery-status.controller';
import { DeliveryStatus } from './entities/delivery-status.entity';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([DeliveryStatus]),
    HttpModule,
    UsersModule,
  ],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService, InterserviceAuthGuard],
})
export class DeliveryStatusModule {}
