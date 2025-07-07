import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create-user-address.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {
  @ApiPropertyOptional({
    description: "Intitulé de l'adresse",
    example: 'Travail',
    type: String,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Le numéro de la rue (ex. "12bis")',
    example: '12bis',
    type: String,
  })
  street_number?: string;

  @ApiPropertyOptional({
    description: 'Le nom de la rue',
    example: 'Rue des Lilas',
    type: String,
  })
  street?: string;

  @ApiPropertyOptional({
    description: 'La ville',
    example: 'Paris',
    type: String,
  })
  city?: string;

  @ApiPropertyOptional({
    description: 'Le code postal',
    example: '75001',
    type: String,
  })
  postal_code?: string;

  @ApiPropertyOptional({
    description: 'Le pays',
    example: 'France',
    type: String,
  })
  country?: string;

  @ApiPropertyOptional({
    description: "Longitude de l'adresse (en degrés)",
    example: 2.3522,
    type: Number,
  })
  long?: number;

  @ApiPropertyOptional({
    description: "Latitude de l'adresse (en degrés)",
    example: 48.8566,
    type: Number,
  })
  lat?: number;
}
