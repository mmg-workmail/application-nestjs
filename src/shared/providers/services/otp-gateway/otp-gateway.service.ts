import { Injectable } from '@nestjs/common';
import { Otp } from 'src/security/user/entities/otp.entity';
import { MailGatewayService } from '../mail-gateway/mail-gateway.service';
import { Type } from 'src/security/user/enums/otp.enum';
import { SmsTemplate } from '../../templates/phone';

import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Sms } from '../../interfaces/sms';

@Injectable()
export class OtpGatewayService {
    private template = new SmsTemplate()
    constructor(

        private readonly mailGatewayService: MailGatewayService,
        @InjectQueue('smsSending') private readonly smsQueue: Queue,

    ) { }
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
            from: '+13213237934'
        }

        // const job = await this.smsQueue.add(otp.use_case, data, {
        //     removeOnComplete  : true,
        //     attempts : 3
        // });

    }

    private sendOtpWithMail(otp: Otp) {
        this.mailGatewayService.sendSMS(otp)
    }
}
