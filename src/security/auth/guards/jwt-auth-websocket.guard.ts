import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthWebsocketGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization; // Extract token from WebSocket handshake

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);

      // Optionally, perform additional checks (e.g., role-based authorization) here
      return true;
    } catch (error) {
        console.log(error, token)
      return false;
    }
  }
}