import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly deliveriesService: DeliveriesService,
  ) {}

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

  // La route appelle désormais la méthode du service qui gère la logique complète
  @Post('accept-order/:orderId')
  async acceptOrder(@Param('orderId') orderId: string): Promise<Delivery> {
    const parsedOrderId = +orderId;

    if (isNaN(parsedOrderId)) {
      throw new Error('Invalid orderId provided. Must be a number.');
    }

    // Appelle la méthode du service qui maintenant gère la mise à jour de la BDD ET l'émission Kafka
    return this.deliveriesService.acceptOrderByOrderId(parsedOrderId);
  }
}