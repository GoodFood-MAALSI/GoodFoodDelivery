import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class UserAddress {
  @ApiProperty({ example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usersId' })
  user: User;

  @ApiProperty({ example: 1})
  @Column()
  user_id: number; // Clé étrangère

  @ApiProperty({ example: "15"})
  @Column()
  street_number: string;

  @ApiProperty({ example: "rue de la capitale"})
  @Column()
  street: string;

  @ApiProperty({ example: "Paris"})
  @Column()
  city: string;

  @ApiProperty({ example: "93200"})
  @Column()
  postal_code: string;

  @ApiProperty({ example: "France"})
  @Column()
  country: string;

  @ApiProperty({ example: false})
  @Column({ default: false })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}