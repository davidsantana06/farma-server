import { Test, TestingModule } from '@nestjs/testing';
import { Company, Product } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompanyService', () => {
  const companies = [
    {
      id: '4002f37f-bfc1-4478-afa3-924bcb59d806',
      name: 'Drogasil',
    },
    {
      id: '6d0599ac-e8ad-41f7-bc04-c725db756d5c',
      name: 'Farmafine',
    },
    {
      id: 'cb1e5cde-ab6c-4bd0-bbb3-a3ecbc61ac26',
      name: 'Oficial Farma',
    },
    {
      id: '6d135a7f-acf1-45a9-bfdb-bb7c7d459fe5',
      name: 'Ultrafarma',
    },
  ];

  const validData = {
    name: 'Farmafine (LTDA)',
  };

  const invalidData = {
    name: 7,
  };

  let repository: CompanyRepository;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CompanyRepository>(CompanyRepository);
    service = module.get<CompanyService>(CompanyService);
  });

  describe('create', () => {
    const company = companies[0];

    it('should create a new company', async () => {
      const data = company as CreateCompanyDto;

      const createdCompany = company as Company;

      jest.spyOn(repository, 'create').mockResolvedValue(createdCompany);

      const result = await service.create(data);

      expect(result).toEqual(createdCompany);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('find all', () => {
    it('should return all companies', async () => {
      const foundCompanies = companies.map((company) => ({
        ...company,
        products: [],
      })) as (Company & { products: Product[] })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCompanies);

      const result = await service.findAll();

      expect(result).toEqual(foundCompanies);
      expect(repository.findMany).toHaveBeenCalled();
    });
  });

  describe('find one', () => {
    const company = companies[1];

    it('should return a single company', async () => {
      const { id } = company;

      const foundCompany = {
        ...company,
        products: [],
      } as Company & { products: Product[] };

      jest.spyOn(repository, 'findUnique').mockResolvedValue(foundCompany);

      const result = await service.findOne(id);

      expect(result).toEqual(foundCompany);
      expect(repository.findUnique).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const company = companies[2];

    it('should update an existing company', async () => {
      const { id } = company;
      const data = validData as UpdateCompanyDto;

      const updatedCompany = {
        ...company,
        ...data,
        products: [],
      } as Company & { products: Product[] };

      jest.spyOn(repository, 'update').mockResolvedValue(updatedCompany);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedCompany);
      expect(repository.update).toHaveBeenCalledWith(id, data);
    });

    it('should return errors for invalid data', async () => {
      const data = plainToInstance(CreateCompanyDto, invalidData);

      const result = await validate(data);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('remove', () => {
    const company = companies[3];

    it('should remove an existing company', async () => {
      const { id } = company;

      const deletedCompany = company as Company;

      jest.spyOn(repository, 'delete').mockResolvedValue(deletedCompany);

      const result = await service.remove(id);

      expect(result).toEqual(deletedCompany);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
