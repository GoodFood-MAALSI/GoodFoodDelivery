import { IsInt, IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateDeliveryDto {

    @ApiProperty({ example: 120 })
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty({ example: 120 })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    transport_mode_id: number;
  
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    delivery_status_id: number;

}

