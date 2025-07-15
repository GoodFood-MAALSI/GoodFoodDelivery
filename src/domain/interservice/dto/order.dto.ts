import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  status_id: number;
}
