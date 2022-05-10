import { User } from '@prisma/client';

import { FileWithRelations } from '../file/file.type';

export type UserWithRelations = User & {
    Files?: FileWithRelations;
};
