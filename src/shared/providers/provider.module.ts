import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { SmsGatewayService } from './services/sms-gateway/sms-gateway.service';
import { MailGatewayService } from './services/mail-gateway/mail-gateway.service';
import { OtpGatewayService } from './services/otp-gateway/otp-gateway.service';
import { ConfigService } from '@nestjs/config';
import { ProvidersConfig } from '../configs/interface';
import { ConfigKey } from '../configs/enum';
import { QueueModule } from '../queue/queue.module';
import { SmsProcessor } from './services/sms-gateway/smsProcessor';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const ProvidersConfig = configService.get<ProvidersConfig>(ConfigKey.PROVIDERS)

        return {
          accountSid: ProvidersConfig.sms.accountID,
          authToken: ProvidersConfig.sms.token,
        }
      },
      inject: [ConfigService],
    }),
    QueueModule
  ],
  providers: [SmsGatewayService, MailGatewayService, OtpGatewayService, SmsProcessor],
  exports: [OtpGatewayService]
})
export class ProvidersModule {}
