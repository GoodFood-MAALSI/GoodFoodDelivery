import { Delivery } from 'src/domain/deliveries/entities/delivery.entity';
import { UserAddress } from 'src/domain/user-addresses/entities/user-address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Delivery, delivery => delivery.user) 
  deliveries: Delivery[];

  @OneToMany(() => UserAddress, userAddress => userAddress.user)
  userAddress: UserAddress[];
}
