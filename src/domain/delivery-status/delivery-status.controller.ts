import { Controller, Get } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('delivery-status')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les statuts de la livraison' })
  findAll() {
    return this.deliveryStatusService.findAll();
  }
}
