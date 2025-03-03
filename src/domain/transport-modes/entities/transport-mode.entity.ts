import { Delivery } from 'src/domain/deliveries/entities/delivery.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class TransportMode {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Delivery, delivery => delivery.transport_mode) // Relation OneToMany avec Delivery
  deliveries: Delivery[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
