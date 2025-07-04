import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportModeDto } from './create-transport-mode.dto';
import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransportModeDto extends PartialType(CreateTransportModeDto) {
        @ApiProperty({ example: 'Voiture',required: false})
        @IsOptional()
        name?: string;
}
