import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { Request } from 'express';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { DeliveriesService } from './deliveries.service';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';
import { BypassResponseWrapper } from '../utils/decorators/bypass-response-wrapper.decorator';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @UseGuards(InterserviceAuthGuardFactory(['deliverer']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crée une nouvelle livraison' })
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @Req() req: Request,
  ): Promise<Delivery> {
    const user = req.user as JwtPayloadType;
    createDeliveryDto.user_id = user.id;
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  @UseGuards(InterserviceAuthGuardFactory(['super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère toutes les livraisons' })
  findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  @UseGuards(InterserviceAuthGuardFactory(['client', 'deliverer', 'super-admin', 'admin', 'restaurateur']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère une livraison par son ID' })
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Delivery> {
    const user = req.user as JwtPayloadType;
    return this.deliveriesService.findOne(+id, user);
  }

  @Get(':livreurId/revenue')
  @UseGuards(InterserviceAuthGuardFactory(['deliverer']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calcule le revenu total du livreur' })
  async getLivreurRevenue(
    @Param('livreurId') livreurId: number,
    @Req() req: Request,
  ): Promise<{ livreurId: number; totalRevenue: number; orders: any[] }> {
    const user = req.user as JwtPayloadType;
    return this.deliveriesService.calculateLivreurRevenueWithOrders(livreurId, user);
  }

  @Post(':id/verify-code')
  @HttpCode(HttpStatus.OK)
  @UseGuards(InterserviceAuthGuardFactory(['deliverer']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vérifie le code de livraison' })
  async verifyCode(
    @Param('id') id: string,
    @Body() body: VerifyCodeDto,
    @Req() req: Request,
  ): Promise<{ isValid: boolean }> {
    const user = req.user as JwtPayloadType;
    return this.deliveriesService.verifyDeliveryCode(+id, body.code, user);
  }

  @Get('interservice/order/:orderId')
  @ApiExcludeEndpoint()
  @BypassResponseWrapper()
  async getDeliveryByOrderId(@Param('orderId') orderId: string): Promise<Delivery | null> {
    const parsedOrderId = parseInt(orderId);
    if (isNaN(parsedOrderId)) {
      throw new HttpException('ID commande invalide', HttpStatus.BAD_REQUEST);
    }
    return this.deliveriesService.findByOrderId(parsedOrderId);
  }
}