import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "@nestjs/class-validator";

export class CreateUserAddressDto {
  @IsNotEmpty()
  @IsString()
  street_number: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsBoolean()
  is_default: boolean;
}
