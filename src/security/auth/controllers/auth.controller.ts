import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { Public } from '../decorators/public.decorator';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from '../guards/jwt-refresh-token.guard';

import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import {  ForgetPasswordDto } from '../dto/forget-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';


@Controller('client/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async invalidateToken(@Headers('Authorization') authorization: string) {
    const token = authorization.split(' ')[1];

    await this.authService.invalidateToken(token);
    return { message: 'Token invalidated successfully' };
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }

  @Post('login-with-phone')
  async loginWithPhone() {

  }

  @Post('login-with-mail') 
  async loginWithMail() {
    
  }


  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto)
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }

  

}
