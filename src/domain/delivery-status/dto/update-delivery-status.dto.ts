import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryStatusDto } from './create-delivery-status.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateDeliveryStatusDto extends PartialType(CreateDeliveryStatusDto) {
    @ApiProperty({ example: 'Livré',required: false})
    @IsOptional()
    name?: string;
}
