import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumberString } from 'class-validator';

export class VerifyCodeDto {
  @ApiProperty({ example: '12345', description: 'Code de vérification à 5 chiffres.' })
  @IsString()
  @Length(5, 5, { message: 'Le code de vérification doit comporter exactement 5 chiffres.' })
  @IsNumberString() 
  code: string;
}