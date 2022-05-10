import { Injectable } from '@nestjs/common';

import { Pagination } from '@project-name/src/shared/libs/tapsa-repository/tapsa-repository.type';
import { BaseSerializer } from '@project-name/src/shared/libs/tapsa-serializer';
import { FileResponseDto } from './dto/file-response.dto';
import { FileWithRelations } from './file.type';
// import { GetFileByFileId } from './dto/getFileByFileId.dto';

@Injectable()
export class FileSerializer extends BaseSerializer<
    FileWithRelations,
    FileResponseDto
> {
    public async serialize(
        file: FileWithRelations,
        outputType: 'FileResponseDto' | 'GetFileByFileId', // : Promise<FileResponseDto | GetFileByFileId>
    ) {
        let output: any;

        switch (outputType) {
            case 'FileResponseDto':
                output = new FileResponseDto(file);
                break;
            case 'GetFileByFileId':
                // output = new GetFileByFileId(file);
                break;
        }

        return output;
    }

    public async serializePaginated(
        value: Pagination<FileWithRelations>,
        outputType: 'FileResponseDto',
    ): Promise<Pagination<FileResponseDto>> {
        let paginated: Pagination<FileResponseDto>;

        if (outputType === 'FileResponseDto') {
            paginated = new Pagination<FileResponseDto>(
                value.items.map((file) => new FileResponseDto(file)),
                value.meta,
                value.links,
            );
        } else {
            paginated = new Pagination<FileResponseDto>(
                value.items.map((file) => new FileResponseDto(file)),
                value.meta,
                value.links,
            );
        }

        return paginated;
    }
}
