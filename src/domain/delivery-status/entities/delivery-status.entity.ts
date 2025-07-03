import { ApiProperty } from "@nestjs/swagger";
import { Delivery } from "src/domain/deliveries/entities/delivery.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DeliveryStatus {
  @ApiProperty({ example: 1})
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'En cours'})
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
