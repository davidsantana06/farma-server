import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPresentation(): string {
    return 'Farma Server is alive!';
  }
}
