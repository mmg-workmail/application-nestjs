import { Injectable } from '@nestjs/common';
import { Otp } from 'src/security/user/entities/otp.entity';
import { SmsGatewayService } from '../sms-gateway/sms-gateway.service';
import { MailGatewayService } from '../mail-gateway/mail-gateway.service';
import { Type } from 'src/security/user/enums/otp.enum';
import { SmsTemplate } from '../../templates/phone';


@Injectable()
export class OtpGatewayService {
    private template = new SmsTemplate()
    constructor(
        private readonly smsGatewayService : SmsGatewayService,
        private readonly mailGatewayService : MailGatewayService,
        ) {}
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

    private sendOtpWithSms(otp: Otp) {
        this.smsGatewayService.sendSMS(
            {
                body: this.template.get(otp),
                to: otp.user.phoneNumber,
                from: '+13213237934'
             }
        )
    }

    private sendOtpWithMail(otp: Otp) {
        this.mailGatewayService.sendSMS(otp)
    }
}
