import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthWsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization; // Extract token from WebSocket handshake
    if (!token){
        return false
    }

    return  this.authService.verifyJwt(token)
  }
}