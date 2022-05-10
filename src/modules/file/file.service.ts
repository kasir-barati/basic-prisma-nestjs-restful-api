import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';

import { BaseService } from '@project-name/src/shared/libs/tapsa-crud';
import { FileWithRelations } from './file.type';
import { FilePrismaRepository } from './file.repository';
import { PrismaService } from '@project-name/src/shared/modules/prisma-management/prisma-management.service';

@Injectable()
export class FileService extends BaseService<
    FileWithRelations,
    Prisma.FileCreateArgs,
    Prisma.FileUpdateArgs,
    Prisma.FileUpdateManyArgs,
    Prisma.FileFindFirstArgs,
    Prisma.FileFindManyArgs,
    Prisma.FileDeleteArgs,
    Prisma.FileDeleteManyArgs
> {
    constructor(
        public prismaService: PrismaService,
        public fileRepository: FilePrismaRepository,
    ) {
        super(fileRepository, {
            NOT_FOUND: 'فایل مورد نظر وجود ندارد',
            DUPLICATE: 'فایل وارد شده تکراری است',
        });
    }
}
