import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { CreateUserRequestDto } from '../dto/create-user.dto';
import { UserRepository } from '../user-repository';

@Injectable()
export class CreateUserBusinessValidatorInterceptor
    implements NestInterceptor
{
    constructor(private readonly userRepository: UserRepository) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest();
        const requestBody: CreateUserRequestDto = request.body;
        const { email } = requestBody;
        const isThereAnyUserWithThisEmail =
            await this.userRepository.getOne({
                where: {
                    email,
                },
            });

        if (isThereAnyUserWithThisEmail) {
            throw new BadRequestException('Duplicate email address');
        }

        return next.handle();
    }
}
