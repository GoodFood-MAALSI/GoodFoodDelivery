import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty } from '@nestjs/class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  transport_mode_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  delivery_status_id: number;
}
