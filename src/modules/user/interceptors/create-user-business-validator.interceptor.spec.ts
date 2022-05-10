import { UserRepository } from '../user-repository';
import { CreateUserBusinessValidatorInterceptor } from './create-user-business-validator.interceptor';

describe('CreateUserBusinessValidatorInterceptor', () => {
    let mockedUserRepository: UserRepository;

    beforeEach(() => {
        mockedUserRepository = {} as any;
    });

    it('should be defined', () => {
        expect(
            new CreateUserBusinessValidatorInterceptor(
                mockedUserRepository,
            ),
        ).toBeDefined();
    });
});
