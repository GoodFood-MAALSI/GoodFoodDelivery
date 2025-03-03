import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class CreateTransportModeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
