import { Module } from '@nestjs/common';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from '../../entities/otp.entity';
import { OtpService } from '../otp/services/otp/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  providers: [ClientService, OtpService],
  controllers: [ClientController],
  exports: [ClientService]
})
export class ClientModule {}
