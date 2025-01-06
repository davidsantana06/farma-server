import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentaryModule } from './commentary/commentary.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CommentaryModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
