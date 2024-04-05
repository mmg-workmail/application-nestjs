import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/security/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register-user.dto';


@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

      ) {}
      async register(createUserDto: RegisterUserDto): Promise<User>  {
        const user: User = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.phoneNumber = createUserDto.phoneNumber
        await user.bcryptPassword(createUserDto.password);

        user.gender = createUserDto.gender;
    
        return this.usersRepository.save(user);
      }
      
      async findOne(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
      }

      async findByUsernameOREmailOrPhone(account: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: [{ username : account }, { email : account}, {phoneNumber: account}]  });
      }

      async findByUsernameOREmailOrPhoneForPassword(account: string): Promise<User | undefined> {
        return await this.usersRepository
        .createQueryBuilder("user")
        .addSelect(['user.password'])
        .where("user.username = :username", { username: account })
        .orWhere("user.email = :email", { email: account })
        .orWhere("user.phoneNumber = :phoneNumber", { phoneNumber: account })
        .getOne()
      }

      async resetPassword(_user: User, newPassword : string) {
        const user: User = new User();

        user.id = _user.id
        await user.bcryptPassword(newPassword)
        await this.usersRepository.save(user);
        return {
          username: _user.username,
          email: _user.email
        }
      }
}
