import { FileWithRelations } from '../file.type';

export class FileResponseDto {
    id: string;
    mimetypeKey: string;
    filename: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(file: FileWithRelations) {
        // adminId,
        // adminUserId,
        // size,
        const { mimetypeKey, id, createdAt, updatedAt, filename } =
            file;
        this.id = id;
        this.mimetypeKey = mimetypeKey;
        this.filename = filename;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
