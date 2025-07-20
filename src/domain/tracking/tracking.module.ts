import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracking, TrackingSchema } from './entities/tracking.schema';
import { MongooseDatabaseModule } from 'src/database/mongodatabse.module';
import { HttpModule } from 'node_modules/@nestjs/axios';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';

@Module({
  imports: [MongooseDatabaseModule,MongooseModule.forFeature([{ name: Tracking.name, schema: TrackingSchema }]), UsersModule,TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [TrackingController],
  providers: [TrackingService, InterserviceAuthGuard],
})
export class TrackingModule {}
