import { Injectable } from '@nestjs/common';
import { Comment, Company, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProductDto): Promise<Product> {
    const { companyId, ...rest } = data;
    return this.prisma.product.create({
      data: {
        ...rest,
        company: { connect: { id: companyId } },
      },
    });
  }

  findMany(
    skip: number,
    take: number,
    companyId?: number,
    name?: string,
  ): Promise<(Product & { comments: Comment[]; company: Company })[]> {
    return this.prisma.product.findMany({
      where: {
        AND: [
          companyId ? { companyId } : {},
          name ? { name: { contains: name } } : {},
        ],
      },
      orderBy: { name: 'asc' },
      include: { comments: true, company: true },
      skip,
      take,
    });
  }

  findUnique(
    id: number,
  ): Promise<Product & { comments: Comment[]; company: Company }> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { comments: true, company: true },
    });
  }

  update(
    id: number,
    data: UpdateProductDto,
  ): Promise<Product & { comments: Comment[]; company: Company }> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { comments: true, company: true },
    });
  }

  delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
