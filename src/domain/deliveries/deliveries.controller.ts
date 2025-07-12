import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';

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
  @ApiOperation({ summary: 'Met à jour une livraison existante (générique)' })
  @ApiBody({ type: UpdateDeliveryDto, description: 'Données de mise à jour de la livraison.' })
  @ApiResponse({ status: 200, description: 'La livraison a été mise à jour avec succès.', type: Delivery })
  @ApiResponse({ status: 404, description: 'Livraison, mode de transport ou statut non trouvé.' })
  update(@Param('id') id: string, @Body() patchDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    return this.deliveriesService.update(+id, patchDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }


  @Get(':livreurId/revenue')
  async getLivreurRevenue(@Param('livreurId') livreurId: number): Promise<{ livreurId: number; totalRevenue: number }> {
    const totalRevenue = await this.deliveriesService.calculateLivreurRevenue(livreurId);
    return { livreurId, totalRevenue };
  }

    @Post(':id/verify-code')
  @HttpCode(HttpStatus.OK) // Retourne 200 OK pour une vérification réussie ou échouée (mais gérée)
  @ApiOperation({ summary: 'Vérifie le code de livraison pour une commande' })
  @ApiBody({ type: VerifyCodeDto, description: 'Le code de vérification à comparer.' })
  @ApiResponse({ status: 200, description: 'Résultat de la vérification du code.', type: Boolean })
  @ApiResponse({ status: 400, description: 'Requête invalide (ex: code non valide).' })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée.' })
  async verifyCode(
    @Param('id') id: string,
    @Body() body: VerifyCodeDto, // Utilise le DTO pour le corps de la requête
  ): Promise<{ isValid: boolean }> {
    const isValid = await this.deliveriesService.verifyDeliveryCode(+id, body.code);
    return { isValid };
  }

  // La route appelle désormais la méthode du service qui gère la logique complète
  // @Post('accept-order/:orderId')
  // async acceptOrder(@Param('orderId') orderId: string): Promise<Delivery> {
  //   const parsedOrderId = +orderId;

  //   if (isNaN(parsedOrderId)) {
  //     throw new Error('Invalid orderId provided. Must be a number.');
  //   }

  //   // Appelle la méthode du service qui maintenant gère la mise à jour de la BDD ET l'émission Kafka
  //   return this.deliveriesService.acceptOrderByOrderId(parsedOrderId);
  // }
}