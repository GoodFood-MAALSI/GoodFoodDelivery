import { User } from 'src/domain/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @Column({ type: 'decimal', precision: 15, scale: 8, default: 0 })
  long: number;

  @Column({ type: 'decimal', precision: 15, scale: 8, default: 0 })
  lat: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}