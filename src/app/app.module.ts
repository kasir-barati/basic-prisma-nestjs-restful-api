import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import webAppConfig from './configs/web-app.config';
import corsConfig from './configs/cors.config';
import helmetConfig from './configs/helmet.config';
import { UserModule } from '../modules/user/user.module';
import { LoggerModule } from '../modules/logger/logger.module';
import { validate } from './validators/env.validator';
import { AuthModule } from '../modules/auth/auth.module';
import { AuthController } from '../modules/auth/auth.controller';
import { FileModule } from '../modules/file/file.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            load: [webAppConfig, corsConfig, helmetConfig],
            cache: true,
            validate: validate,
        }),
        AuthModule,
        UserModule,
        FileModule,
        LoggerModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {}
