import { Module } from '@nestjs/common';
import { OtpService } from './services/otp/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from '../../entities/otp.entity';
import { OtpSubscriber } from './subscribers/otp.subscribers';
import { ProvidersModule } from 'src/shared/providers/provider.module';


@Module({
  imports: [TypeOrmModule.forFeature([Otp]), ProvidersModule],
  providers: [OtpService, OtpSubscriber],
  exports: [OtpService]
})
export class OtpModule {}
