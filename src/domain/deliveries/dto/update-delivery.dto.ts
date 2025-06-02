// update-delivery.dto.ts (manuel)
import { IsNumber, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeliveryDto {

    @ApiProperty({ example: 120, required: false }) // 'required: false' pour Swagger UI
    @IsNumber()
    @IsOptional() // Marque la propriété comme optionnelle
    order_id?: number; // Utilise '?' pour marquer la propriété comme optionnelle en TypeScript

    @ApiProperty({ example: 120, required: false })
    @IsNumber()
    @IsOptional()
    user_id?: number;

    @ApiProperty({ example: 1, required: false })
    @IsNumber()
    @IsOptional()
    transport_mode_id?: number;

    @ApiProperty({ example: 1, required: false })
    @IsNumber()
    @IsOptional()
    delivery_status_id?: number;
}