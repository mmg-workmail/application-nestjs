import { Module } from '@nestjs/common';
import { WebsocketGateway } from './gateways/websocket/websocket.gateway';
import { AuthModule } from 'src/security/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [WebsocketGateway]
})
export class WebsocketModule {}
