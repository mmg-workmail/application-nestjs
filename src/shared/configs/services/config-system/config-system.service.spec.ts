import { Test, TestingModule } from '@nestjs/testing';
import { ConfigSystemService } from './config-system.service';

describe('ConfigSystemService', () => {
  let service: ConfigSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigSystemService],
    }).compile();

    service = module.get<ConfigSystemService>(ConfigSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
