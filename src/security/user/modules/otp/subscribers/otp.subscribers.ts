import { Otp } from 'src/security/user/entities/otp.entity';
import { OtpGatewayService } from 'src/shared/providers/services/otp-gateway/otp-gateway.service';



import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  
  
  @EventSubscriber()
  export class OtpSubscriber implements EntitySubscriberInterface<Otp> {
    constructor(dataSource: DataSource, private readonly otpGatewayService : OtpGatewayService) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return Otp;
    }
  
    beforeInsert(event: InsertEvent<Otp>) {
      //console.log(`BEFORE USER INSERTED: `, event.entity);
    }
    afterInsert(event: InsertEvent<Otp>) {
        this.otpGatewayService.sendOtp(event.entity)
       // console.log(`After USER INSERTED: `, event.entity);
    }
  }