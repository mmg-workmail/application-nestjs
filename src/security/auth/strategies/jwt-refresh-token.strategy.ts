import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService as UserClientService } from 'src/security/user/modules/client/services/client.service';
import { Logger } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/shared/configs/interface';
import { ConfigKey } from 'src/shared/configs/enum';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token',
) {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(
        private readonly usersService: UserClientService,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
             secretOrKey: configService.get<Auth>(ConfigKey.AUTH).secret,
        });
        this.logger.warn('JwtRefreshTokenStrategy initialized');
    }

    async validate(payload: JwtPayload): Promise<any> {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
        const user = await this.usersService.findOne(payload.sub);
        if (!user) {
            this.logger.error('User not found');
            throw new UnauthorizedException();
        }
        return user;
    }
}
