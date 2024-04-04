import { Module } from '@nestjs/common';
import { WebsocketGateway } from './gateways/websocket/websocket.gateway';

@Module({
  providers: [WebsocketGateway]
})
export class WebsocketModule {}
