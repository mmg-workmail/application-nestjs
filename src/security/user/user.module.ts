import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { OtpModule } from './modules/otp/otp.module';


@Module({
  imports: [ AdminModule, ClientModule, OtpModule]
})
export class UserModule {}
