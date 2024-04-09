import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configurations';
import { ConfigSystemService } from './services/config-system/config-system.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({
    load: [...configurations],
    isGlobal: true,
    cache: false
  })],
  providers: [ConfigSystemService],
  exports: [ConfigSystemService],
})
export class ConfigsModule {}