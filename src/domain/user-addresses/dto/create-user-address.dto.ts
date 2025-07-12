import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressDto {
  @ApiProperty({
    description: "Intitulé de l'adresse",
    example: 'Travail',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Le numéro de la rue (ex. "12bis")',
    example: '12bis',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  street_number: string;

  @ApiProperty({
    description: 'Le nom de la rue',
    example: 'Rue des Lilas',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'La ville',
    example: 'Paris',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Le code postal',
    example: '75001',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({
    description: 'Le pays',
    example: 'France',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Longitude de l\'adresse (en degrés)',
    example: 2.3522,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  long: number;

  @ApiProperty({
    description: 'Latitude de l\'adresse (en degrés)',
    example: 48.8566,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  lat: number;
}