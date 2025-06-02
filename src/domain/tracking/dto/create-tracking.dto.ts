// create-tracking.dto.ts
import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackingDto {
  @ApiProperty({ example: '60c72b2f9b1d8c001c8e4a7b', description: 'ID du livreur' }) // Example is a typical ObjectId string
  @IsString()
  @IsNotEmpty()
  livreur_id: string;

  @ApiProperty({ example: 'Jean Dupont', description: 'Nom du livreur' })
  @IsString()
  @IsNotEmpty()
  livreur_name: string;

  @ApiProperty({ example: 48.8566, description: 'Latitude de la position actuelle' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 2.3522, description: 'Longitude de la position actuelle' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ example: 35.7, description: 'Vitesse actuelle en km/h' })
  @IsNumber()
  @IsNotEmpty()
  speed_kmh: number;
}