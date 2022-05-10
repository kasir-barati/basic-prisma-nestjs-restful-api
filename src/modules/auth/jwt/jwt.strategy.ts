import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import authConfig from '../configs/auth.config';
import { UserService } from '@project-name/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(authConfig.KEY)
        authConfigs: ConfigType<typeof authConfig>,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigs.jwtSecret,
        });
    }

    /**
     * @summary
     * This kind of using JWT is not stateless any more. But I prefer to use this way instead of dealing with
     * other problems.
     */
    async validate(payload: any) {
        const user = await this.userService.getOne({
            where: {
                id: payload.sub,
            },
            include: {
                // TODO: include or do whatever you like
                Files: true,
            },
        });

        return user;
    }
}
