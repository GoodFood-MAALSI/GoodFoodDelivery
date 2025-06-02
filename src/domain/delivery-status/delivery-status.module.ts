import { Module } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { DeliveryStatusController } from './delivery-status.controller';
import { DeliveryStatus } from './entities/delivery-status.entity';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports : [DatabaseModule,TypeOrmModule.forFeature([DeliveryStatus])],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService],
})
export class DeliveryStatusModule {}
