// src/tracking/tracking.controller.ts
import { Controller, Post, Get, Body, Param, Query, Put } from '@nestjs/common'; // Ajout de Put
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingLocationDto } from './dto/update-tracking.dto';


@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post() // POST /tracking - Pour créer la première position ou une nouvelle entrée
  async create(@Body() createTrackingDto: CreateTrackingDto) { 
    return this.trackingService.create(createTrackingDto);
  }

  @Get() // GET /tracking - Récupère toutes les entrées de tracking
  async findAll() {
    return this.trackingService.findAll();
  }

  @Get('latest/:livreurId')
  async findLatestByLivreurId(@Param('livreurId') livreurId: number) {
    return this.trackingService.findLatestLocationByLivreurId(livreurId);
  }

  @Get('near') 
  async findNear(
    @Query('lon') longitude: number,
    @Query('lat') latitude: number,
    @Query('radius') radius: number,
  ) {
    return this.trackingService.findDriversNear(longitude, latitude, radius);
  }

  @Put('location/:livreurId') // PUT /tracking/location/:livreurId
  async updateLocation(
    @Param('livreurId') livreurId: number,
    @Body() updateTrackingLocationDto: UpdateTrackingLocationDto, // Le DTO est reçu ici
  ) {
    // Il suffit de passer le DTO entier au service, car le service attend maintenant le DTO
    return this.trackingService.updateDriverLocation(
      livreurId,
      updateTrackingLocationDto // <-- Passez le DTO complet ici
    );
  }
}