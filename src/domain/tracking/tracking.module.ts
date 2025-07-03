import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracking, TrackingSchema } from './entities/tracking.schema';
import { MongooseDatabaseModule } from 'src/database/mongodatabse.module';

@Module({
  imports: [MongooseDatabaseModule,MongooseModule.forFeature([{ name: Tracking.name, schema: TrackingSchema }]), UsersModule,TypeOrmModule.forFeature([User])],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
