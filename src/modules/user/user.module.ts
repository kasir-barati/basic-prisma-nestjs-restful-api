import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user-repository';
import { PrismaModule } from '@project-name/src/shared/modules/prisma-management/prisma-management.module';
import { PrismaService } from '@project-name/src/shared/modules/prisma-management/prisma-management.service';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, PrismaService],
    exports: [UserService],
})
export class UserModule {}
