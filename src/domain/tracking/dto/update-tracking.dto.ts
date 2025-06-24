import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PointDto } from './create-tracking.dto'; // Re-use PointDto from create-tracking.dto.ts

export class UpdateTrackingLocationDto {
  @ApiProperty({ type: PointDto, description: 'GeoJSON Point object for updated location' })
  @ValidateNested()
  @Type(() => PointDto)
  location: PointDto;

  @ApiProperty({ example: 35.0, description: 'Current speed in km/h (optional)', required: false })
  @IsNumber()
  @IsOptional()
  speedKmh?: number;
}