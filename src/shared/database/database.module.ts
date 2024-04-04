import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigKey, Environment } from '../configs/enum';
import { AppConfig, DatabaseConfig } from '../configs/interface';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {

                const databaseConfig = configService.get<DatabaseConfig>(ConfigKey.DB)
                const appConfig = configService.get<AppConfig>(ConfigKey.APP)

                return {
                    type: 'postgres',
                    host: databaseConfig.host,
                    port: databaseConfig.port,
                    password: databaseConfig.password,
                    username: databaseConfig.username,
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    database: databaseConfig.database,
                    synchronize: Environment.DEVELOPMENT === appConfig.env && true,
                    logging: Environment.DEVELOPMENT === appConfig.env && false,
                    autoLoadEntities: true,
                  }
            },
          }),
    ]
})
export class DatabaseModule {}
