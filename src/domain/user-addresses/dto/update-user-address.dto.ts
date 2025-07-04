import { IsString, IsNotEmpty, IsBoolean, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAddressDto {
  @ApiProperty({ example: '15', required: false }) // 'required: false' for Swagger UI
  @IsOptional() // Marks the property as optional for validation
  @IsString()
  street_number?: string; // Marks the property as optional in TypeScript

  @ApiProperty({ example: 'rue de la mairie', required: false })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ example: 'Armentieres', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: '59280', required: false })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiProperty({ example: 'France', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}