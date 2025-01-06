import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentaryModule } from './commentary/commentary.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CommentaryModule, CompanyModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
