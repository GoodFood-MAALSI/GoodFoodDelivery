import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransportModesService } from './transport-modes.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';

@Controller('transport-modes')
export class TransportModesController {
  constructor(private readonly transportModesService: TransportModesService) {}

  @Get()
  @UseGuards(InterserviceAuthGuardFactory(['client', 'deliverer', 'super-admin', 'admin', 'restaurateur']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer les moyen de transport de la livraison' })
  findAll() {
    return this.transportModesService.findAll();
  }
}
