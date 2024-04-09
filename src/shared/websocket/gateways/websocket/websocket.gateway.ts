import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { channel } from '../../enums/channel';
import { JwtAuthWsGuard } from 'src/security/auth/guards/jwt-auth-ws.guard';
import { ConfigSystemService } from 'src/shared/configs/services/config-system/config-system.service';
import { Roles } from 'src/security/acl/decorators/roles.decorator';
import { Role } from 'src/security/acl/enums/role.enum';
import { RoleGuardWs } from 'src/security/acl/guards/role.guard.ws';


@WebSocketGateway(5005)
export class WebsocketGateway {

  constructor(private readonly configSystemService : ConfigSystemService){}

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

  @UseGuards(JwtAuthWsGuard)
  @SubscribeMessage(channel.JOIN_PRIVATE_USER_CHANNEL)
  async joinPrivateUserChannel(client: Socket, data: any): Promise<unknown> {

    // get user
    const user = client.handshake.auth

    if (this.configSystemService.app.log) {
      this.logger.log(`User ${user.username} joined private wallet channel`);
    }

    client.emit(channel.JOIN_PRIVATE_USER_CHANNEL, 'You have joined the private channel');
    // join for user
    client.join(`privateWalletChannel-${user.username}`);

    return
  }

  @UseGuards(JwtAuthWsGuard, RoleGuardWs)
  @Roles(Role.SUPER_ADMIN)
  @SubscribeMessage(channel.JOIN_PRIVATE_ADMIN_CHANNEL)
  async joinPrivateAdminChannel(client: Socket, data: any): Promise<unknown> {

    // get user
    const user = client.handshake.auth

    if (this.configSystemService.app.log) {
      this.logger.log(`Admin ${user.username} joined private channel`);
    }
    client.emit(channel.JOIN_PRIVATE_USER_CHANNEL, 'You have joined the private channel');


    // join for admin
    client.join(channel.JOIN_PRIVATE_ADMIN_REPORT_REGISTER);
    client.join(channel.JOIN_PRIVATE_ADMIN_REPORT_LOGIN);
    client.join(channel.JOIN_PRIVATE_ADMIN_REPORT_OTP);

    return
  }

}
