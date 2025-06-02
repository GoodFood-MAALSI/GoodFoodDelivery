import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async createTracking(@Body() body: { livreur_name: string, livreur_id: string; latitude: number; longitude: number; speed_kmh: number }) {
    console.log(body.livreur_id, body.latitude, body.longitude, body.speed_kmh );
    return this.trackingService.createTracking(body.livreur_name, body.livreur_id, body.latitude, body.longitude, body.speed_kmh);
  }

  @Get(':livreur_id')
  async getTrackingByLivreur(@Param('livreur_id') livreur_id: string) {
    return this.trackingService.getTrackingByLivreur(livreur_id);
  }
}
