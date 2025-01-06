import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  imports: [PrismaModule],
})
export class ProductModule {}
