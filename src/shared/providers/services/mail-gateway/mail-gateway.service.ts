import { Injectable } from '@nestjs/common';
import { Otp } from 'src/security/user/entities/otp.entity';

@Injectable()
export class MailGatewayService {
    sendSMS(otp : Otp) {
        console.log('send mail')
  }
}
