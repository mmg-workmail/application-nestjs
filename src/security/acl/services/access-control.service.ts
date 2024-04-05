import { Injectable } from '@nestjs/common';
import { Role } from '../enums/role.enum';

interface IsAuthorizedParams {
  currentRoles: Role[];
  requiredRole: Role;
}

@Injectable()
export class AccessContorlService {


  constructor() {
  }

  public isAuthorized({ currentRoles, requiredRole }: IsAuthorizedParams) {
    return currentRoles.includes(requiredRole);
  }
}