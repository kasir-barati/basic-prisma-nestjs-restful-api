import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalAuthStrategy } from './local-auth/local-auth.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import authConfig from './configs/auth.config';
import { JwtModuleConfig } from './configs/jwt.config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(authConfig)],
            inject: [ConfigService],
            useClass: JwtModuleConfig,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalAuthStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
