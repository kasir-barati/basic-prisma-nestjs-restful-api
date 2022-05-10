import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { json } from 'express';

import { AppModule } from './app/app.module';
// All general configs for RESTful API
import corsConfig from './app/configs/cors.config';
import helmetConfig from './app/configs/helmet.config';
import webAppConfig from './app/configs/web-app.config';

// All Middleware
import { csrfMiddlewareError } from './shared/middlewares/csrf-error.middleware';
import { csrfMiddleware } from './shared/middlewares/csrf.middleware';

// Services
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    app.useLogger(app.get(LoggerService));
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            validationError: {
                target: true,
                value: true,
            },
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.setGlobalPrefix('api/v1');
    app.use(json({ limit: '20mb' }));

    const webAppConfigs = app.get<ConfigType<typeof webAppConfig>>(
        webAppConfig.KEY,
    );
    const corsConfigs = app.get<ConfigType<typeof corsConfig>>(
        corsConfig.KEY,
    );
    const helmetConfigs = app.get<ConfigType<typeof helmetConfig>>(
        helmetConfig.KEY,
    );

    app.use(cookieParser());
    app.use(
        csurf({
            cookie: { sameSite: true },
            value: (req) => req.cookies['XSRF-TOKEN'],
        }),
    );
    app.use(csrfMiddleware);
    app.use(csrfMiddlewareError);
    app.enableCors(corsConfigs);
    app.use(helmet(helmetConfigs));

    if (webAppConfigs.showSwaggerUi) {
        // initialize Swagger using the SwaggerModule class
        const documentBuilderConfig = new DocumentBuilder()
            .setTitle('RESTful API')
            .setDescription(
                'The RESTful API implemented in Prisma and NestJS',
            )
            .setVersion('1.0')
            .addTag('API Name')
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            })
            .build();
        const swaggerDocument = SwaggerModule.createDocument(
            app,
            documentBuilderConfig,
        );

        SwaggerModule.setup(
            webAppConfigs.swaggerPath,
            app,
            swaggerDocument,
        );
    }

    await app.listen(webAppConfigs.port);
}
bootstrap();
