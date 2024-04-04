import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Logger } from '@nestjs/common';

@WebSocketGateway(5005)
export class WebsocketGateway {
  // constructor(private readonly websocketService: WebsocketService) { }

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

  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, data: any): void {
    this.logger.log(`Message from client ${client.id}: ${JSON.stringify(data)}`);
    client.emit('newMessage', { name: 'Nest' });
    // this.server.emit('newMessage', `Hi,${data.username}`);
  }


}
