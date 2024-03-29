import { IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'src/security/user/enums/otp.enum';

export class ForgetPasswordDto {

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type = Type.MAIL;  

  @IsNotEmpty()
  account: string;

}
