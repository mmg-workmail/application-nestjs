import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '../configs/enum';
import { CacheManager } from '../configs/interface';


import { JobFailedService } from './services/job-failed/job-failed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobFailed } from './entities/job-failed.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([JobFailed]),
        BullModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                const redisdbConfig = configService.get<CacheManager>(ConfigKey.CACHE_MANAGER);
                return {
                    redis: {
                      host: redisdbConfig.host,
                      port: redisdbConfig.port,
                      password: redisdbConfig.password,
                    },
                  }
            },
            inject: [ConfigService],
        })
    ],
    providers: [JobFailedService], 
    exports: [BullModule, JobFailedService],
})
export class QueueModule {

}
