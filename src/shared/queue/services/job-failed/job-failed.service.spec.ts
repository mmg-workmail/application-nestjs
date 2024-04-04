import { Test, TestingModule } from '@nestjs/testing';
import { JobFailedService } from './job-failed.service';

describe('JobFailedService', () => {
  let service: JobFailedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFailedService],
    }).compile();

    service = module.get<JobFailedService>(JobFailedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
