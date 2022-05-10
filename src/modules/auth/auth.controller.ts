import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GetUser } from '@project-name/src/shared/decorators/get-user.decorator';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { UserWithRelations } from '@project-name/user/user.type';
import { LoginUserRequestDto } from './dto/login-user-request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @UseGuards(LocalAuthGuard)
    login(
        @Body() loginUser: LoginUserRequestDto,
        @GetUser() user: UserWithRelations,
    ) {
        return this.authService.login(user);
    }
}
