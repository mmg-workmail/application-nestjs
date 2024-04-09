import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AccessContorlService } from '../services/access-control.service';

export class UserDto {
  id: number;
  roles: Role[];
}

@Injectable()
export class RoleGuardWs implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const client = context.switchToWs().getClient();
    const user = client.handshake['auth'] as UserDto;

    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRoles: user.roles,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}