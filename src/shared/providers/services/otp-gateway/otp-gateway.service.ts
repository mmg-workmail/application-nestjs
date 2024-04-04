import { Injectable } from '@nestjs/common';
import { Otp } from 'src/security/user/entities/otp.entity';
import { MailGatewayService } from '../mail-gateway/mail-gateway.service';
import { Type } from 'src/security/user/enums/otp.enum';
import { SmsTemplate } from '../../templates/phone';

import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Sms } from '../../interfaces/sms';
import { QueueName, QueueAttempts } from '../../enums';
import { ConfigService } from '@nestjs/config';
import { ProvidersConfig } from 'src/shared/configs/interface';
import { ConfigKey } from 'src/shared/configs/enum';
import { JobData } from 'src/shared/queue/interfaces/job-data';

@Injectable()
export class OtpGatewayService {
    private template = new SmsTemplate();
    private providersConfig: ProvidersConfig;
    constructor(
        private readonly configService: ConfigService,
        private readonly mailGatewayService: MailGatewayService,
        @InjectQueue(QueueName.SMS_SENDING) private readonly smsQueue: Queue,

    ) { 
        this.providersConfig = this.configService.get<ProvidersConfig>(ConfigKey.PROVIDERS) 
    }
    sendOtp(otp: Otp) {
        switch (otp.type) {
            case Type.MAIL:
                this.sendOtpWithMail(otp)
                break;

            case Type.PHONE:
                this.sendOtpWithSms(otp)
                break;
        }
    }

    private async sendOtpWithSms(otp: Otp) {

        const data: Sms = {
            body: this.template.get(otp),
            to: otp.user.phoneNumber,
            from: this.providersConfig.sms.from
        }

        const jobData: JobData<Sms> = {
            payload : data,
            user_id : otp.user.id
        }

        await this.smsQueue.add(otp.use_case, jobData, {
            removeOnComplete  : true,
            attempts : QueueAttempts.SMS_ATTEMPTS,
            removeOnFail: true
        });

    }

    private sendOtpWithMail(otp: Otp) {
        this.mailGatewayService.sendSMS(otp)
    }
}
