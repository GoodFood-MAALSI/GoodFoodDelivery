import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';

@Controller('delivery-status')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Get()
  @UseGuards(InterserviceAuthGuardFactory(['client', 'deliverer', 'super-admin', 'admin', 'restaurateur']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer les statuts de la livraison' })
  findAll() {
    return this.deliveryStatusService.findAll();
  }
}
