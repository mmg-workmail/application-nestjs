import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { Sms } from '../../interfaces/sms';


@Injectable()
export class SmsGatewayService {

   public constructor(private readonly twilioService: TwilioService) { }
   sendSMS(options: Sms) {
      this.sendSMSWithTwilio(options)
   }

   private async sendSMSWithTwilio(options: Sms) {
      return this.twilioService.client.messages.create({
         body: options.body,
         to: options.to,
         from: options.from,
      }).catch(x => (console.log(x))).then(x => (console.log(x)));
   }
}
