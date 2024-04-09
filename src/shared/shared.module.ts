import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from '../security/security.module';
import { CacheManagerModule } from './cache-manager/cache-manager.module';
import { LoggerMiddleware } from '../common/utils/logger';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProvidersModule } from './providers/provider.module';
import { QueueModule } from './queue/queue.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
    imports: [
        ConfigsModule,
        DatabaseModule,
        SecurityModule,
        CacheManagerModule,
        ProvidersModule,
        ThrottlerModule.forRoot(
            [
                {
                  name: 'short',
                  ttl: 1000,
                  limit: 3,
                },
                {
                  name: 'medium',
                  ttl: 10000,
                  limit: 20
                },
                {
                  name: 'long',
                  ttl: 60000,
                  limit: 100
                }
            ]
        ),
        QueueModule,
        WebsocketModule,

    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
    ],
})
export class SharedModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
