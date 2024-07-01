import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment, pathPrefixSwagger } from '@libs/utility';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const [APPNAME, PORT, NODE_ENV] = [environment.APPNAME, environment.PORT, environment.NODE_ENV];
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle(`${APPNAME} API`)
    .setDescription(`${APPNAME} API | Environment ${NODE_ENV}`)
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(pathPrefixSwagger.setup, app, document);

  await app.listen(PORT);
  Logger.log(`App ${APPNAME} listen on port ${PORT}`);
}
bootstrap();
