import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Put,
  UseGuards,
  Req, 
  HttpException, 
  HttpStatus,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingLocationDto } from './dto/update-tracking.dto';
import { AuthGuard } from '@nestjs/passport'; 
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'; 
import { Request } from 'express'; 
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type'; 

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post() 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Crée une nouvelle entrée de suivi de livreur' })
  @ApiResponse({ status: 201, description: 'Entrée de suivi créée avec succès.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async create(
    @Body() createTrackingDto: CreateTrackingDto,
    @Req() req: Request, 
  ) {
    try {
      const user = req.user as JwtPayloadType;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }
      createTrackingDto.livreurId = user.id;

      return await this.trackingService.create(createTrackingDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Échec de la création de l\'entrée de suivi',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get() 
  @ApiOperation({ summary: 'Récupère toutes les entrées de suivi de livreurs' })
  @ApiResponse({ status: 200, description: 'Liste de toutes les entrées de suivi.' })
  async findAll() {
    return this.trackingService.findAll();
  }

  @Get('latest/:livreurId')
  @ApiOperation({ summary: 'Récupère la dernière position connue d\'un livreur' })
  @ApiParam({ name: 'livreurId', description: 'ID du livreur', type: Number })
  @ApiResponse({ status: 200, description: 'Dernière position du livreur.' })
  @ApiResponse({ status: 404, description: 'Livreur non trouvé ou aucune position enregistrée.' })
  async findLatestByLivreurId(@Param('livreurId') livreurId: number) {
    return this.trackingService.findLatestLocationByLivreurId(livreurId);
  }


  @Get('near')
  @ApiOperation({ summary: 'Trouve les livreurs à proximité d\'une coordonnée' })
  @ApiQuery({ name: 'lon', description: 'Longitude du point central', type: Number })
  @ApiQuery({ name: 'lat', description: 'Latitude du point central', type: Number })
  @ApiQuery({ name: 'radius', description: 'Rayon de recherche en mètres', type: Number })
  @ApiResponse({ status: 200, description: 'Liste des livreurs à proximité.' })
  @ApiResponse({ status: 400, description: 'Paramètres de requête invalides.' })
  async findNear(
    @Query('lon') longitude: number,
    @Query('lat') latitude: number,
    @Query('radius') radius: number,
  ) {
    return this.trackingService.findDriversNear(longitude, latitude, radius);
  }

  @Put('location/:livreurId') // PUT /tracking/location/:livreurId
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Met à jour la position d\'un livreur' })
  @ApiParam({ name: 'livreurId', description: 'ID du livreur', type: Number })
  @ApiResponse({ status: 200, description: 'Position du livreur mise à jour.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit (si l\'utilisateur n\'est pas le livreur concerné).' })
  @ApiResponse({ status: 404, description: 'Livreur non trouvé.' })
  async updateLocation(
    @Param('livreurId') livreurId: number,
    @Body() updateTrackingLocationDto: UpdateTrackingLocationDto,
    @Req() req: Request,
  ) {
    try {
      const user = req.user as JwtPayloadType;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (user.id !== +livreurId) {
        throw new HttpException(
          'Accès interdit: Vous ne pouvez mettre à jour que votre propre position.',
          HttpStatus.FORBIDDEN,
        );
      }
      return await this.trackingService.updateDriverLocation(
        livreurId,
        updateTrackingLocationDto,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Échec de la mise à jour de la position du livreur',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}