import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryStatusDto {
  @ApiProperty({ example: 'En cours'})
  @IsString()
  @IsNotEmpty()
  name: string;
}
