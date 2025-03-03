import { Delivery } from "src/domain/deliveries/entities/delivery.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DeliveryStatus {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Delivery, (delivery) => delivery.deliveryStatus) // Relation OneToMany avec Delivery
  deliveries: Delivery[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
