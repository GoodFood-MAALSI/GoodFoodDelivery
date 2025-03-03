import { DeliveryStatus } from 'src/domain/delivery-status/entities/delivery-status.entity';
import { TransportMode } from 'src/domain/transport-modes/entities/transport-mode.entity';
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
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  order_id: number;

  @ManyToOne(() => Users, user => user.deliveries) // Relation ManyToOne with User
  user: Users;
  
  @Column()
  user_id: number;

  @ManyToOne(() => TransportMode, transportMode => transportMode.deliveries) // Relation ManyToOne with TransportMode
  transport_mode: TransportMode;

  @Column()
  transport_mode_id: number;

  @ManyToOne(() => DeliveryStatus, deliveryStatus => deliveryStatus.deliveries) // Relation ManyToOne with TransportMode
  deliveryStatus: DeliveryStatus;

  @Column()
  delivery_status_id: number;

  @Column()
  strat_time: Date;

  @Column()
  end_time: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
