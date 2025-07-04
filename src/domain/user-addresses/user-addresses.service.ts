import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAddressesService {
  constructor(
        @InjectRepository(UserAddress)
        private readonly userAddressRepository: Repository<UserAddress>,
      ) {}
    
      async create(createuserAddressDto: CreateUserAddressDto) {
        const userAddress = this.userAddressRepository.create(createuserAddressDto)
        return await this.userAddressRepository.save(userAddress);
      }
    
      async findAll() {
        return await this.userAddressRepository.find();
      }
    
      async findOne(id: number) {
        return await this.userAddressRepository.findOne({ where: {id}});
      }
    
      async update(id: number, updateuserAddressDto: UpdateUserAddressDto) {
    
        const userAddress = await this.findOne(id);
    
        if(!userAddress){
          throw new NotFoundException();
        }
    
        Object.assign(userAddress,updateuserAddressDto);
        return await this.userAddressRepository.save(userAddress);
      }
    
      async remove(id: number) {
        const userAddress = await this.findOne(id);
    
        if(!userAddress){
          throw new NotFoundException();
        }
        return await this.userAddressRepository.remove(userAddress);
      }
}
