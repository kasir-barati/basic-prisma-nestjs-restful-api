import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { multerConfigGenerator } from './configs/multer.config';
import { FileSerializer } from './file.serializer';
import { FileService } from './file.service';
import { nanoidGenerator } from '@project-name/src/shared/helpers/nanoid-generator.helper';

@ApiTags('File')
@Controller('files')
export class FileController {
    constructor(
        private readonly filesService: FileService,
        private readonly fileSerializer: FileSerializer,
    ) {}

    /**
     * @summary
     * # Upload files
     *
     * - You have to send it multipart
     */
    @Post('upload')
    @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor(
            'file',
            multerConfigGenerator().multerConfigs,
        ),
    )
    async create(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('فایل آپلود نشد.');
        }
        const uploadedFile = await this.filesService.add({
            data: {
                User: {
                    connect: {
                        id: 'user.id',
                    },
                },
                filename: file.filename,
                Mimetype: {
                    connect: {
                        value: file.mimetype,
                    },
                },
                size: file.size,
                id: nanoidGenerator(),
            },
        });

        return this.fileSerializer.serialize(
            uploadedFile,
            'FileResponseDto',
        );
    }
}
