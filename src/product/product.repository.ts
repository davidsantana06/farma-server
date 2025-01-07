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
        company: { connect: { id: companyId } },
      },
    });
  }

  findMany(): Promise<
    (Product & { commentaries: Commentary[]; company: Company })[]
  > {
    return this.prisma.product.findMany({
      orderBy: { name: 'asc' },
      include: { commentaries: true, company: true },
    });
  }

  findManyByCompanyId(
    companyId: string,
  ): Promise<(Product & { commentaries: Commentary[]; company: Company })[]> {
    return this.prisma.product.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
      include: { commentaries: true, company: true },
    });
  }

  findUnique(
    id: string,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { commentaries: true, company: true },
    });
  }

  update(
    id: string,
    data: UpdateProductDto,
  ): Promise<Product & { commentaries: Commentary[]; company: Company }> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { commentaries: true, company: true },
    });
  }

  delete(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
