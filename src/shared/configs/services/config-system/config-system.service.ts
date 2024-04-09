import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Auth, CacheManager, DatabaseConfig, ProvidersConfig, Validation } from '../../interface';
import { ConfigKey } from '../../enum';

@Injectable()
export class ConfigSystemService {

    constructor(private readonly configService : ConfigService) {}

    public readonly app : AppConfig = this.setApp();
    public readonly db : DatabaseConfig = this.setDb();
    public readonly cacheManager : CacheManager = this.setDCacheManager();
    public readonly validation : Validation = this.setDValidation();
    public readonly auth : Auth = this.setAuth();
    public readonly providersConfig : ProvidersConfig = this.setProviders();

    private setApp() : AppConfig {
        return this.configService.get<AppConfig>(ConfigKey.APP)
    }

    private setDb() : DatabaseConfig {
        return this.configService.get<DatabaseConfig>(ConfigKey.DB)
    }

    private setDCacheManager() : CacheManager {
        return this.configService.get<CacheManager>(ConfigKey.CACHE_MANAGER)
    }

    private setDValidation() : Validation {
        return this.configService.get<Validation>(ConfigKey.VALIDATION)
    }

    private setAuth() : Auth {
        return this.configService.get<Auth>(ConfigKey.AUTH)
    }    
    
    private setProviders() : ProvidersConfig {
        return this.configService.get<ProvidersConfig>(ConfigKey.PROVIDERS)
    }
}
