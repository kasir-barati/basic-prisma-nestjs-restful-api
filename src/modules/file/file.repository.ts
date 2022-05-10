import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';

import { BasePrismaRepository } from '@project-name/src/shared/libs/tapsa-repository';
import { PrismaService } from '@project-name/src/shared/modules/prisma-management/prisma-management.service';
import { FileWithRelations } from './file.type';

@Injectable()
export class FilePrismaRepository extends BasePrismaRepository<
    FileWithRelations,
    Prisma.FileCreateArgs,
    Prisma.FileUpdateArgs,
    Prisma.FileUpdateManyArgs,
    Prisma.FileFindFirstArgs,
    Prisma.FileFindManyArgs,
    Prisma.FileDeleteArgs,
    Prisma.FileDeleteManyArgs
> {
    constructor(public readonly prismaService: PrismaService) {
        super(prismaService.file);
    }
}
