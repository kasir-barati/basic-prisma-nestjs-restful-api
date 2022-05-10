import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    healthCheck(): string {
        // TODO: Do health checks here
        return 'I am healthy!';
    }
}
