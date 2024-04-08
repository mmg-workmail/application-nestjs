import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GatewayService } from '../../services/gateway/gateway.service';
import { channel } from '../../enums/channel';

@WebSocketGateway(5005)
export class WebsocketGateway {

  constructor(private readonly gatewayService: GatewayService) { 

  }

  @WebSocketServer()
  server: Server;

  private clients: Set<Socket> = new Set();
  private logger: Logger = new Logger("WebSocketApp")

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.clients.add(client);
    //  client.emit('events', `Welcome ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @SubscribeMessage(channel.JOIN_PRIVATE_USER_CHANNEL)
  async handleMessage(client: Socket, data: any): Promise<unknown> {

    // Recive token of headers
    const token = client.handshake.headers.authorization;
    const isValid = await this.gatewayService.verifyAsync(token)

    if (!isValid) {
      client.emit(channel.JOIN_PRIVATE_USER_CHANNEL, { message: 'Authentication failed' });
    } else {
      this.logger.log(`User ${isValid.username} joined private wallet channel`);
      client.emit(channel.JOIN_PRIVATE_USER_CHANNEL, 'You have joined the private channel');
      client.join(channel.JOIN_PRIVATE_OTP_SYSTEM);
      // client.join(`privateWalletChannel-${isValid.username}`);
    
    }

    // client.emit('newMessage', { name: 'Nest' });
    // this.server.emit('newMessage', `Hi,${data.username}`);

    return
  }


}
