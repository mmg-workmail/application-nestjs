import { Test, TestingModule } from '@nestjs/testing';
import { MailGatewayService } from './mail-gateway.service';

describe('MailGatewayService', () => {
  let service: MailGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailGatewayService],
    }).compile();

    service = module.get<MailGatewayService>(MailGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
