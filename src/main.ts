import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './shared/configs/interface';
import { ConfigKey } from './shared/configs/enum';
import { ErrorFilter } from './common/filters/error.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);


  // set global validation
  app.useGlobalPipes(new ValidationPipe());

  // set an error filter
  app.useGlobalFilters(new ErrorFilter()); 

  // set port of config 
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(ConfigKey.APP)


  app.setGlobalPrefix('api/v1/');
  await app.listen(appConfig.port);


}
bootstrap();
