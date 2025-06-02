// update-tracking.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackingDto {
  @ApiProperty({ example: '60c72b2f9b1d8c001c8e4a7b', description: 'ID du livreur', required: false })
  @IsOptional() // Marque la propriété comme optionnelle pour la validation
  @IsString()
  livreur_id?: string; // Marque la propriété comme optionnelle en TypeScript

  @ApiProperty({ example: 'Jean Dupont', description: 'Nom du livreur', required: false })
  @IsOptional()
  @IsString()
  livreur_name?: string;

  @ApiProperty({ example: 48.8566, description: 'Latitude de la position actuelle', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 2.3522, description: 'Longitude de la position actuelle', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: 35.7, description: 'Vitesse actuelle en km/h', required: false })
  @IsOptional()
  @IsNumber()
  speed_kmh?: number;
}