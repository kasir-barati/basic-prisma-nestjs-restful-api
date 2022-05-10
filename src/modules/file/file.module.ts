import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaModule } from '@project-name/src/shared/modules/prisma-management/prisma-management.module';
import { FilePrismaRepository } from './file.repository';
import { FileSerializer } from './file.serializer';

@Module({
    imports: [PrismaModule],
    controllers: [FileController],
    providers: [FileService, FilePrismaRepository, FileSerializer],
    exports: [FilePrismaRepository, FileSerializer, FileService],
})
export class FileModule {}
