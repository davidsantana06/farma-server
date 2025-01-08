import { Injectable } from '@nestjs/common';
import { Commentary, Company, Product } from '@prisma/client';
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
        company: { connect: { id: Number(companyId) } },
      },
    });
  }

  findMany(
    skip: number,
    take: number,
    companyId?: number,
    name?: string,
  ): Promise<(Product & { commentaries: Commentary[]; company: Company })[]> {
    return this.prisma.product.findMany({
      where: {
        AND: [
          companyId ? { companyId } : {},
          name ? { name: { contains: name } } : {},
        ],
      },
      orderBy: { name: 'asc' },
      include: { commentaries: true, company: true },
      skip,
      take,
    });
  }

  findUnique(
    id: number,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { commentaries: true, company: true },
    });
  }

  update(
    id: number,
    data: UpdateProductDto,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { commentaries: true, company: true },
    });
  }

  delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
