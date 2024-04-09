import { Global, Module, forwardRef } from '@nestjs/common';
import { WebsocketGateway } from './gateways/websocket/websocket.gateway';
import { AuthModule } from 'src/security/auth/auth.module';


@Global()
@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [WebsocketGateway],
  exports: [
    WebsocketGateway,
  ]
})
export class WebsocketModule {}
