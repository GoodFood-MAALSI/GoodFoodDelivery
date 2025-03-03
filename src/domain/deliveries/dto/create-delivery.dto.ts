import { IsInt, IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class CreateDeliveryDto {

    @IsNumber()
    @IsNotEmpty()
    order_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    transport_mode_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    delivery_status_id: number;

}
