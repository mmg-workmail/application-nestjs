import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from 'class-validator';
import { Role } from 'src/security/acl/enums/role.enum';
import { Gender } from 'src/security/user/enums/gender.enum';




export class CreateUserDto {

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(
    {
      host_whitelist: ['gmail.com']
    }, { message: 'Please provide valid Email.' }
  )
  email: string;

    
  @IsMobilePhone()
  phoneNumber: string

  @IsInt()
  age: number = 1;


  @IsString()
  @IsEnum(Gender)
  gender: Gender = Gender.U;
  
  @IsString()
  @IsEnum(Role)
  role: Role = Role.USER;

  @IsNotEmpty()
  @MinLength(7, { message: 'Name must have atleast 2 characters.' })
  password: string;
}