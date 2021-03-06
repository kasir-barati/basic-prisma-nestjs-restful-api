import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { IsInt, IsString, validateSync } from 'class-validator';

import { AuthConfig } from '../types/auth-config.type';

export default registerAs('authConfigs', (): AuthConfig => {
    const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, JWT_SECRET } =
        process.env;
    const validatedEnvs = validate({
        ACCESS_TOKEN_TTL,
        REFRESH_TOKEN_TTL,
        JWT_SECRET,
    });

    const config: AuthConfig = {
        jwtSecret: validatedEnvs.JWT_SECRET,
        accessTokenTtl: validatedEnvs.ACCESS_TOKEN_TTL,
        refreshTokenTtl: validatedEnvs.REFRESH_TOKEN_TTL,
    };

    return config;
});

class EnvironmentVariables {
    @IsString()
    JWT_SECRET: string;

    @IsInt()
    ACCESS_TOKEN_TTL: number;

    @IsInt()
    REFRESH_TOKEN_TTL: number;
}

function validate(
    config: Record<string, unknown>,
): EnvironmentVariables {
    const validatedConfigs = plainToClass(
        EnvironmentVariables,
        config,
        {
            enableImplicitConversion: true,
        },
    );
    const validatedConfigsErrors = validateSync(validatedConfigs, {
        skipMissingProperties: false,
    });

    if (validatedConfigsErrors.length > 0) {
        console.dir({
            errors: validatedConfigsErrors.map((error) => ({
                value: error.value,
                property: error.property,
                message: Object.values(error.constraints!)[0],
            })),
            errorCode:
                'required_environment_variables_loading_failed',
            message:
                'Application could not load required environment variables',
        });
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
