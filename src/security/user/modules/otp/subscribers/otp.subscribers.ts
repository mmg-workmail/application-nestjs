import { Otp } from 'src/security/user/entities/otp.entity';
import { OtpGatewayService } from 'src/shared/providers/services/otp-gateway/otp-gateway.service';
import { channel } from 'src/shared/websocket/enums/channel';
import { WebsocketGateway } from 'src/shared/websocket/gateways/websocket/websocket.gateway';

import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  
  
  @EventSubscriber()
  export class OtpSubscriber implements EntitySubscriberInterface<Otp> {
    constructor(dataSource: DataSource, private readonly otpGatewayService : OtpGatewayService, private readonly websocketGateway: WebsocketGateway) {
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
        this.websocketGateway.server.emit(channel.JOIN_PRIVATE_ADMIN_REPORT_OTP, event.entity)
       // console.log(`After USER INSERTED: `, event.entity);
    }
  }