import { Test, TestingModule } from '@nestjs/testing';
import { OtpGatewayService } from './otp-gateway.service';

describe('OtpGatewayService', () => {
  let service: OtpGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpGatewayService],
    }).compile();

    service = module.get<OtpGatewayService>(OtpGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
