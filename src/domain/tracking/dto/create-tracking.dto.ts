import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// You might define a nested DTO for the GeoJSON Point location
export class PointDto {
  @ApiProperty({ example: 'Point', enum: ['Point'], default: 'Point' })
  @IsString()
  @IsNotEmpty()
  type: 'Point';

  @ApiProperty({ example: [2.3522, 48.8566], description: '[longitude, latitude]' })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number]; // [longitude, latitude]
}

export class CreateTrackingDto {
  @ApiProperty({ example: 1, description: 'ID of the driver' })
  @IsNumber()
  @IsNotEmpty()
  livreurId: number;

  @ApiProperty({ example: 1, description: 'ID of the delivery' })
  @IsNumber()
  @IsNotEmpty()
  deliveryId: number;

  @ApiProperty({ example: 'Jacob', description: 'Name of the driver' })
  @IsString()
  @IsNotEmpty()
  livreurName: string;

  @ApiProperty({ type: PointDto, description: 'GeoJSON Point object for location' })
  @ValidateNested()
  @Type(() => PointDto)
  location: PointDto;

  @ApiProperty({ example: 25.5, description: 'Current speed in km/h (optional)', required: false })
  @IsNumber()
  @IsOptional()
  speedKmh?: number;

  @ApiProperty({ example: '2025-06-20T10:00:00Z', description: 'Timestamp of the tracking update (optional)', required: false })
  @IsDateString()
  @IsOptional()
  timestamp?: Date; // Mongoose can auto-set this, but allow if provided
}