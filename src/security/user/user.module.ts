import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpModule } from './modules/otp/otp.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, Otp]), AdminModule, ClientModule, OtpModule],
  exports: [TypeOrmModule]
})
export class UserModule {}
