import { Controller, Get } from '@nestjs/common';
import { TransportModesService } from './transport-modes.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('transport-modes')
export class TransportModesController {
  constructor(private readonly transportModesService: TransportModesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les moyen de transport de la livraison' })
  findAll() {
    return this.transportModesService.findAll();
  }
}
