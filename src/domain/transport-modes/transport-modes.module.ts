import { Module } from '@nestjs/common';
import { TransportModesService } from './transport-modes.service';
import { TransportModesController } from './transport-modes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { TransportMode } from './entities/transport-mode.entity';
import { HttpModule } from 'node_modules/@nestjs/axios';
import { UsersModule } from '../users/users.module';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([TransportMode]),
    HttpModule,
    UsersModule,
  ],
  controllers: [TransportModesController],
  providers: [TransportModesService, InterserviceAuthGuard],
})
export class TransportModesModule {}
