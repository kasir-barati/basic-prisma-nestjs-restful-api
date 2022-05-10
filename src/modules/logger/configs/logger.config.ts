import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    IsUrl,
    validateSync,
} from 'class-validator';

import {
    LoggerConfig,
    WinstonDefaultLogLevels,
} from '../logger.type';

export default registerAs('loggerConfig', (): LoggerConfig => {
    validate(process.env);

    return {
        level: process.env.LOGGER_LEVEL,
        isRotateLoggerFilesActivated:
            process.env.IS_ROTATE_LOGGER_FILES_ACTIVATED,
        loggerMaxFile: process.env.LOGGER_MAX_FILES,
        loggerMaxSize: process.env.LOGGER_MAX_SIZE,
        loggerName: process.env?.LOGGER_NAME ?? 'project-name',
        sentryDsn: process.env.SENTRY_DSN,
    };
});

export class LoggerEnvironmentVariables {
    @IsEnum(WinstonDefaultLogLevels)
    LOGGER_LEVEL: WinstonDefaultLogLevels;

    @IsOptional()
    @IsString()
    LOGGER_MAX_SIZE: string;

    @IsOptional()
    @IsString()
    LOGGER_MAX_FILES: string;

    @IsBoolean()
    IS_ROTATE_LOGGER_FILES_ACTIVATED: boolean;

    @IsString()
    LOGGER_NAME?: string;

    @IsUrl()
    SENTRY_DSN: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfigs = plainToInstance(
        LoggerEnvironmentVariables,
        config,
        { enableImplicitConversion: true },
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
                'required environment variables loading failed',
            message:
                'Application could not load required environment variables',
        });
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
