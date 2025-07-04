import { Module } from '@nestjs/common';
import { TransportModesService } from './transport-modes.service';
import { TransportModesController } from './transport-modes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { TransportMode } from './entities/transport-mode.entity';

@Module({
  imports : [DatabaseModule,TypeOrmModule.forFeature([TransportMode])],
  controllers: [TransportModesController],
  providers: [TransportModesService],
})
export class TransportModesModule {}
