import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health_check(): { message: string } {
    return { message: 'ok' };
  }
}
