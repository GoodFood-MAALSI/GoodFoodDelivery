import { Users } from 'src/domain/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';


@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.userAddress) // Relation ManyToOne avec User
  user: Users;

  @Column()
  user_id: number; // Clé étrangère

  @Column()
  street_number: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column({ default: false })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}