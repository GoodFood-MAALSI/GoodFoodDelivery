import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  HttpException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { Request } from 'express';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { DeliveriesService } from './deliveries.service';
import { AuthGuard } from 'node_modules/@nestjs/passport';

@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Crée une nouvelle livraison' })
  @ApiResponse({
    status: 201,
    description: 'La livraison a été créée avec succès.',
    type: Delivery,
  })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @Req() req: Request,
  ): Promise<Delivery> {
    try {
      const user = req.user as JwtPayloadType;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }
      createDeliveryDto.user_id = user.id;

      return await this.deliveriesService.create(createDeliveryDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Échec de la création de la livraison',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupère toutes les livraisons' })
  @ApiResponse({
    status: 200,
    description: 'Liste de toutes les livraisons.',
    type: [Delivery],
  })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère une livraison par son ID' })
  @ApiResponse({
    status: 200,
    description: 'La livraison trouvée.',
    type: Delivery,
  })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  findOne(@Param('id') id: string): Promise<Delivery> {
    return this.deliveriesService.findOne(+id);
  }

  // @Get(':livreurId/revenue')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOperation({ summary: 'Calcule le revenu total d\'un livreur' })
  // @ApiResponse({ status: 200, description: 'Revenu total du livreur.' })
  // @ApiResponse({ status: 401, description: 'Non autorisé.' })
  // async getLivreurRevenue(
  //   @Param('livreurId') livreurId: number,
  //   @Req() req: Request, // Injecte l'objet Request
  // ): Promise<{ livreurId: number; totalRevenue: number }> {
  //   try {
  //     const user = req.user as JwtPayloadType;
  //     if (!user || !user.id) {
  //       throw new HttpException(
  //         'Utilisateur non authentifié',
  //         HttpStatus.UNAUTHORIZED,
  //       );
  //     }

  //     const totalRevenue = await this.deliveriesService.calculateLivreurRevenue(livreurId);
  //     return { livreurId, totalRevenue };
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new HttpException(
  //       {
  //         message: 'Échec du calcul du revenu du livreur',
  //         error: error.message,
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post(':id/verify-code')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Vérifie le code de livraison pour une commande' })
  @ApiBody({
    type: VerifyCodeDto,
    description: 'Le code de vérification à comparer.',
  })
  @ApiResponse({
    status: 200,
    description: 'Résultat de la vérification du code.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide (ex: code non valide).',
  })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async verifyCode(
    @Param('id') id: string,
    @Body() body: VerifyCodeDto,
    @Req() req: Request,
  ): Promise<{ isValid: boolean }> {
    try {
      const user = req.user as JwtPayloadType;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const isValid = await this.deliveriesService.verifyDeliveryCode(
        +id,
        body.code,
      );
      return { isValid };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Échec de la vérification du code de livraison',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
