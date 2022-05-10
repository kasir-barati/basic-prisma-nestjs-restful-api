import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app/app.module';
import { JwtToken } from '../src/modules/auth/types/jwt-token.type';
import { LoginUserRequestDto } from '../src/modules/auth/dto/login-user-request.dto';

const baseUrl = '/api/v1';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/login (POST)', async () => {
        const loginDto: LoginUserRequestDto = {
            password: '',
            username: '',
        };
        const loginResponse = await request(app.getHttpServer())
            .post(`${baseUrl}/auth/login`)
            .send(loginDto)
            .expect(200);
        const userAccessToken = (loginResponse?.body as JwtToken)
            ?.accessToken;
        const userRefreshToken = (loginResponse?.body as JwtToken)
            ?.refreshToken;

        expect(userAccessToken).toBeDefined();
        expect(userRefreshToken).toBeDefined();
    });
});
