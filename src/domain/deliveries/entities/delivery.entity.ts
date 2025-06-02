import { DeliveryStatus } from 'src/domain/delivery-status/entities/delivery-status.entity';
import { TransportMode } from 'src/domain/transport-modes/entities/transport-mode.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Users } from 'src/domain/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery {

  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 120 })
  @Column()
  order_id: number;

  @ManyToOne(() => Users, user => user.deliveries) // Relation ManyToOne with User
  user: Users;

  @ApiProperty({ example: 580 })
  @Column()
  user_id: number;

  @ManyToOne(() => TransportMode, transportMode => transportMode.deliveries) // Relation ManyToOne with TransportMode
  transport_mode: TransportMode;

  @ApiProperty({ example: 1 })
  @Column()
  transport_mode_id: number;

  @ManyToOne(() => DeliveryStatus, deliveryStatus => deliveryStatus.deliveries) // Relation ManyToOne with TransportMode
  deliveryStatus: DeliveryStatus;

  @ApiProperty({ example: 160 })
  @Column()
  delivery_status_id: number;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @Column()
  strat_time: Date;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @Column()
  end_time: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

