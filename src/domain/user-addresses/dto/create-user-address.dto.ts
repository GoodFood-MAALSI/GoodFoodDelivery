import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserAddressDto {
  @ApiProperty({ example: "15"})
  @IsNotEmpty()
  @IsString()
  street_number: string;

  @ApiProperty({ example: "rue de la mairie"})
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: "Armentieres"})
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: "59280"})
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({ example: "France"})
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: true})
  @IsOptional()
  @IsBoolean()
  is_default: boolean;
}
