import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

import { BaseService } from '@project-name/src/shared/libs/tapsa-crud';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UserWithRelations } from './user.type';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService extends BaseService<
    UserWithRelations,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserUpdateManyArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindManyArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserDeleteManyArgs
> {
    constructor(public userRepository: UserRepository) {
        super(userRepository, {
            DUPLICATE: 'Duplicate user',
            NOT_FOUND: 'User not found',
        });
    }

    async create(
        createUserRequestDto: CreateUserRequestDto,
    ): Promise<UserWithRelations> {
        const hashedPassword = this.hashPassword(
            createUserRequestDto.password,
        );
        const { avatar, email, username, family, name } =
            createUserRequestDto;

        return this.add({
            data: {
                password: await hashedPassword,
                avatar,
                email,
                username,
                family,
                name,
            },
        });
    }

    comparePassword({
        plainTextPassword,
        hashedPassword,
    }: {
        plainTextPassword: string;
        hashedPassword: string;
    }) {
        return argon2.verify(hashedPassword, plainTextPassword);
    }

    async hashPassword(plainTextPassword: string): Promise<string> {
        const hashedPassword = argon2.hash(plainTextPassword);

        return await hashedPassword;
    }
}
