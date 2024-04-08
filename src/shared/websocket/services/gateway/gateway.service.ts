import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigKey } from 'src/shared/configs/enum';
import { Auth } from 'src/shared/configs/interface';

@Injectable()
export class GatewayService {
    private logger: Logger = new Logger("WebSocketApp")
    private authConfig: Auth
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) { 
      this.authConfig = this.configService.get<Auth>(ConfigKey.AUTH)
    }
  
     async verifyAsync (token : string) {
        let isValid: boolean | any = false
        if (token) {
    
          // Check Token with JWT
          try {
            isValid = await this.jwtService.verifyAsync(token.split(' ')[1], { secret: this.authConfig.secret })
          } catch (error) {
            this.logger.error(`Authentication failed : ${error}`);
          }
    
        }
        return isValid
    }

}
