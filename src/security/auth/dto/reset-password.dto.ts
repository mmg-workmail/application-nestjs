import {  IsNotEmpty } from 'class-validator';


export class ResetPasswordDto {

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  newPassword: string;

}
