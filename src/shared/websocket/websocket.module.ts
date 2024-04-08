import { Module } from '@nestjs/common';
import { WebsocketGateway } from './gateways/websocket/websocket.gateway';
import { JwtService } from '@nestjs/jwt';
import { GatewayService } from './services/gateway/gateway.service';

@Module({
  imports: [],
  providers: [WebsocketGateway, JwtService, GatewayService],
  exports: [
    WebsocketGateway,
  ]
})
export class WebsocketModule {}
