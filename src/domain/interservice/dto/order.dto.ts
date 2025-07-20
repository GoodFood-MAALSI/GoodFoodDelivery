import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  status_id: number;

  @ApiProperty({ example: 49.99 })
  subtotal: number;
}
