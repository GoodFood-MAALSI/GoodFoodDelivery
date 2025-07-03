import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1})
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Vélo'})
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
