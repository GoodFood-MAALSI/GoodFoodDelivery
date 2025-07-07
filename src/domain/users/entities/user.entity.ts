import {
  Column,
  AfterLoad,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { EntityHelper } from "src/domain/utils/entity-helper";
import { Exclude } from "class-transformer";
import { hashPassword } from "src/domain/utils/helpers";
import { UserAddress } from "src/domain/user-addresses/entities/user-address.entity";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
}

export enum UserRole {
  Deliverer = "deliverer",
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = await hashPassword(this.password);
    }
  }

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.Inactive })
  status: UserStatus;

  @Index()
  @Column({ type: String, nullable: true })
  first_name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  last_name: string | null;

  @Column({ nullable: true })
  street_number: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 15, scale: 8, default: 0 })
  long: number;

  @Column({ type: 'decimal', precision: 15, scale: 8, default: 0 })
  lat: number;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserAddress, userAddress => userAddress.user)
  userAddress: UserAddress[];

  @Column({ type: "enum", enum: UserRole, default: UserRole.Deliverer })
  role: UserRole;
}