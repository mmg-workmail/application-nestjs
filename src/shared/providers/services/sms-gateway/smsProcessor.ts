
import {  OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Sms } from '../../interfaces/sms';
import { UseCase } from 'src/security/user/enums/otp.enum';
import { SmsGatewayService } from './sms-gateway.service';


@Processor('smsSending')
export class SmsProcessor {
  constructor(
    private readonly smsGatewayService: SmsGatewayService,
  ) { }

  @Process(UseCase.FORGET_PASSWORD)
  async sendForgetPasswordSms(job: Job<Sms>) {

    const { data } = job;
    await this.smsGatewayService.sendSMS(data)

  }

  @OnQueueFailed()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}... Is Failed`,
    );
  }
}