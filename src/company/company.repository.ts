import { Injectable } from '@nestjs/common';
import { Company, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({ data });
  }

  findMany(): Promise<(Company & { products: Product[] })[]> {
    return this.prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: { products: true },
    });
  }

  findUnique(id: number): Promise<Company & { products: Product[] }> {
    return this.prisma.company.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  update(
    id: number,
    data: UpdateCompanyDto,
  ): Promise<Company & { products: Product[] }> {
    return this.prisma.company.update({
      where: { id },
      data,
      include: { products: true },
    });
  }

  delete(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
