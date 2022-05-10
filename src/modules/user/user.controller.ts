import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserBusinessValidatorInterceptor } from './interceptors/create-user-business-validator.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    /**
     * @summary
     * Email max length comes from [this RFC standard](https://www.rfc-editor.org/rfc/rfc3696#section-3 "search 320 in that page")
     */
    @Post()
    @UseInterceptors(CreateUserBusinessValidatorInterceptor)
    async create(@Body() createUserRequestDto: CreateUserRequestDto) {
        return await this.usersService.create(createUserRequestDto);
    }

    @Get()
    findAll() {
        return this.usersService.get({});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.getOneOrFail({ where: { id } });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        // TODO: https://godly-weapon.atlassian.net/browse/YS-20
        // TODO: Check avatar exists, is it this module duty?
        return this.usersService.editOne({
            where: { id },
            data: { ...updateUserDto },
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove({
            where: { id },
        });
    }
}
