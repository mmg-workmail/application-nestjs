import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'redisdb',
                port: 6379,
                password: 'default'
            },

        }),
        BullModule.registerQueue({
            name: 'smsSending',
        }),
    ],
    exports: [BullModule], 
})
export class QueueModule {

}
