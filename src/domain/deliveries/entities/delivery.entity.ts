import { DeliveryStatus } from 'src/domain/delivery-status/entities/delivery-status.entity';
import { TransportMode } from 'src/domain/transport-modes/entities/transport-mode.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/domain/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 580 })
  @Column()
  user_id: number;

  @ManyToOne(() => TransportMode)
  @JoinColumn({ name: 'transport_mode_id' })
  transport_mode: TransportMode;

  @ApiProperty({ example: 1 })
  @Column()
  transport_mode_id: number;

  @ManyToOne(() => DeliveryStatus)
  @JoinColumn({ name: 'delivery_status_id' })
  delivery_status: DeliveryStatus;

  @ApiProperty({ example: 160 })
  @Column()
  delivery_status_id: number;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @Column()
  start_time: Date;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @Column()
  end_time: Date;

  @ApiProperty({ example: '12345', description: 'Code de vérification à 5 chiffres pour la livraison.' })
  @Column({ type: 'varchar', length: 5, unique: false, nullable: true }) 
  verification_code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

