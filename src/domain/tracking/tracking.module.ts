import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingGateway } from './tracking.gateway';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/entities/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracking, TrackingSchema } from './entities/tracking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tracking.name, schema: TrackingSchema }]), UsersModule,TypeOrmModule.forFeature([Users])],
  controllers: [TrackingController],
  providers: [TrackingService, TrackingGateway],
})
export class TrackingModule {}
