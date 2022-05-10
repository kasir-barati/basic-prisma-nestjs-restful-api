import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@project-name/src/shared/modules/prisma-management/prisma-management.service';
import { BasePrismaRepository } from '@project-name/src/shared/libs/tapsa-repository';
import { UserWithRelations } from './user.type';

@Injectable()
export class UserRepository extends BasePrismaRepository<
    UserWithRelations,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserUpdateManyArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindManyArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserDeleteManyArgs
> {
    constructor(public readonly prismaService: PrismaService) {
        super(prismaService.user);
    }
}
