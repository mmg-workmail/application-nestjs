import { Test, TestingModule } from '@nestjs/testing';
import { SmsGatewayService } from './sms-gateway.service';

describe('SmsGatewayService', () => {
  let service: SmsGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsGatewayService],
    }).compile();

    service = module.get<SmsGatewayService>(SmsGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
