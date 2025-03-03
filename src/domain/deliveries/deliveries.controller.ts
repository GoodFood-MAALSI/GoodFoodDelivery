import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Delivery> {
    return this.deliveriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }

  @Patch(':id/transport-mode/:transportModeId')
  setTransportMode(
    @Param('id') id: string,
    @Param('transportModeId') transportModeId: string,
  ): Promise<Delivery> {
    return this.deliveriesService.setDeliveryTransportMode(+id, +transportModeId);
  }

  @Patch(':id/delivery-status/:deliveryStatusId')
  setDeliveryStatus(
    @Param('id') id: string,
    @Param('deliveryStatusId') deliveryStatusId: string,
  ): Promise<Delivery> {
    return this.deliveriesService.setDeliveryStatus(+id, +deliveryStatusId);
  }

  @Patch(':id/status/:deliveryStatusId')
  updateStatus(
    @Param('id') id: string,
    @Param('deliveryStatusId') deliveryStatusId: string,
  ): Promise<Delivery> {
    return this.deliveriesService.updateDeliveryStatus(+id, +deliveryStatusId);
  }

}
