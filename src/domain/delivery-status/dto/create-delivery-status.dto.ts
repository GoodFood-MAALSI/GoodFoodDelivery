import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateDeliveryStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
