import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobFailed } from '../../entities/job-failed.entity';
import { Repository } from 'typeorm';
import { Job } from 'bull';
import { JobData } from '../../interfaces/job-data';

@Injectable()
export class JobFailedService {
    constructor(
        @InjectRepository(JobFailed) private readonly jobFailedRepository: Repository<JobFailed>,
    ) { }

    async set<T>(job: Job<JobData<T>>) {

        const jobFailed = new JobFailed()
        jobFailed.user_id = job.data.user_id
        jobFailed.type = job.name
        jobFailed.queue_name = job.queue.name
        jobFailed.stacktrace = job.stacktrace
        jobFailed.payload = job.data.payload

        return this.jobFailedRepository.save(jobFailed);
    }
}
