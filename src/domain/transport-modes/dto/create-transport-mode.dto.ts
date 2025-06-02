import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTransportModeDto {
    @ApiProperty({ example: 'Vélo'})
    @IsString()
    @IsNotEmpty()
    name: string;
}
