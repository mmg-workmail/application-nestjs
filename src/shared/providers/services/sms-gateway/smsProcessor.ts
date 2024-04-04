
import {  OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Sms } from '../../interfaces/sms';
import { UseCase } from 'src/security/user/enums/otp.enum';
import { SmsGatewayService } from './sms-gateway.service';
import { QueueName, QueueAttempts } from '../../enums';
import { JobData } from 'src/shared/queue/interfaces/job-data';
import { JobFailedService } from 'src/shared/queue/services/job-failed/job-failed.service';
import { JobFailed } from 'src/shared/queue/entities/job-failed.entity';


@Processor(QueueName.SMS_SENDING)
export class SmsProcessor {
  constructor(
    private readonly smsGatewayService: SmsGatewayService,
    private readonly jobFieldService: JobFailedService
  ) { }

  @Process(UseCase.FORGET_PASSWORD)
  async sendForgetPasswordSms(job: Job<JobData<Sms>>) {
    const { data } = job;
    await this.smsGatewayService.sendSMS(data.payload)
  }

  // @OnQueueActive()
  // onActive(job: Job) {
  //   console.log(
  //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
  //   );
  // }

  @OnQueueFailed()
  onError(job: Job<JobData<Sms>>) {
    if(job.attemptsMade >= QueueAttempts.SMS_ATTEMPTS) {
      this.jobFieldService.set<Sms>(job)
    }
  }
}