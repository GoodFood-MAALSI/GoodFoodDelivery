import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingGateway } from './tracking.gateway';
import { Tracking } from './entities/tracking.entity';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking]), UsersModule,TypeOrmModule.forFeature([Users])],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingGateway],
})
export class TrackingModule {}
