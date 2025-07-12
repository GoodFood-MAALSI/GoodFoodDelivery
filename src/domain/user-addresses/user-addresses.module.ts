import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddressesController } from './user-addresses.controller';
import { UserAddress } from './entities/user-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { IsEntityExistsConstraint } from '../utils/validators/is-entity-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress]), UsersModule],
  controllers: [UserAddressesController],
  providers: [IsEntityExistsConstraint, UserAddressesService],
})
export class UserAddressesModule {}
