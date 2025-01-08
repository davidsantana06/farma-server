import { Injectable } from '@nestjs/common';
import { Company, Commentary, Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(data: CreateProductDto): Promise<Product> {
    return this.productRepository.create(data);
  }

  findAll(
    page: number,
    limit: number,
    companyId?: number,
    name?: string,
  ): Promise<(Product & { commentaries: Commentary[]; company: Company })[]> {
    return this.productRepository.findMany(
      (page - 1) * limit,
      limit,
      companyId,
      name,
    );
  }

  findOne(
    id: number,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.productRepository.findUnique(id);
  }

  update(
    id: number,
    data: UpdateProductDto,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.productRepository.update(id, data);
  }

  remove(id: number): Promise<Product> {
    return this.productRepository.delete(id);
  }
}
