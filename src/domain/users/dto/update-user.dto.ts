import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "Antoine" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiPropertyOptional({ example: "Dupont" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ example: '45' })
  @IsString()
  street_number?: string | null;

  @ApiPropertyOptional({ example: 'Avenue des Délices' })
  @IsString()
  street?: string | null;

  @ApiPropertyOptional({ example: 'Paris' })
  @IsString()
  city?: string | null;

  @ApiPropertyOptional({ example: '75001' })
  @IsString()
  postal_code?: string | null;

  @ApiPropertyOptional({ example: 'France' })
  @IsString()
  country?: string | null;

  @ApiPropertyOptional({ example: 16.0 })
  @IsNumber()
  long?: number | null;

  @ApiPropertyOptional({ example: 16.0 })
  @IsNumber()
  lat?: number | null;
}