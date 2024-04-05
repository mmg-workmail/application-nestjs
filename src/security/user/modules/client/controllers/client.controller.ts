import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { ClientService } from '../services/client.service';
import { JwtAuthGuard } from 'src/security/auth/guards/jwt-auth.guard';

@Controller('client/users')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    delete req.user.id
    return req.user;
  }
}
