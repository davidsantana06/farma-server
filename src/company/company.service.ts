import { Injectable } from '@nestjs/common';
import { Company, Product } from '@prisma/client';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  create(data: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.create(data);
  }

  findAll(): Promise<(Company & { products: Product[] })[]> {
    return this.companyRepository.findMany();
  }

  findOne(id: string): Promise<Company & { products: Product[] }> {
    return this.companyRepository.findUnique(id);
  }

  update(
    id: string,
    data: UpdateCompanyDto,
  ): Promise<Company & { products: Product[] }> {
    return this.companyRepository.update(id, data);
  }

  remove(id: string): Promise<Company> {
    return this.companyRepository.delete(id);
  }
}
