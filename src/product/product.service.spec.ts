import { Test, TestingModule } from '@nestjs/testing';
import { Comment, Company, Product } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductService', () => {
  const companies = [{ id: 1 }, { id: 2 }];

  const products = [
    {
      id: 1,
      companyId: companies[0].id,
      name: 'Ashwagandha',
      description:
        'Planta adaptogênica usada para reduzir o estresse e melhorar a saúde mental.',
      price: 49.9,
      dosage: '300mg duas vezes ao dia',
    },
    {
      id: 2,
      companyId: companies[1].id,
      name: 'Magnésio Dimalato',
      description:
        'Suplemento mineral usado para melhorar a saúde muscular e promover energia.',
      price: 39.9,
      dosage: '400mg uma vez ao dia',
    },
    {
      id: 3,
      companyId: companies[0].id,
      name: 'Ômega 3',
      description:
        'Suplemento de ácidos graxos essenciais para a saúde cardiovascular e cerebral.',
      price: 59.9,
      dosage: '1000mg duas vezes ao dia',
    },
    {
      id: 4,
      companyId: companies[1].id,
      name: 'Vitamina D3',
      description:
        'Suplemento usado para fortalecer os ossos e melhorar a imunidade.',
      price: 29.9,
      dosage: '2000UI uma vez ao dia',
    },
  ];

  const validData = {
    name: 'Vitamina C',
    description: 'Vitamina usada para melhorar a imunidade.',
    price: 19.9,
    dosage: '500mg uma vez ao dia',
  };

  const invalidData = {
    name: 7,
    dedscription: 7,
  };

  let repository: ProductRepository;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
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

    repository = module.get<ProductRepository>(ProductRepository);
    service = module.get<ProductService>(ProductService);
  });

  describe('create', () => {
    const product = products[0];

    it('should create a new product', async () => {
      const data = product as CreateProductDto;

      const createdProduct = product as Product;

      jest.spyOn(repository, 'create').mockResolvedValue(createdProduct);

      const result = await service.create(data);

      expect(result).toEqual(createdProduct);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('find all', () => {
    const page = 1;
    const limit = products.length;

    const skip = (page - 1) * limit;
    const take = limit;

    it('should return all products', async () => {
      const foundProducts = products.map((product) => ({
        ...product,
        comments: [],
        company: {},
      })) as (Product & { comments: Comment[]; company: Company })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundProducts);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(foundProducts);
      expect(repository.findMany).toHaveBeenCalledWith(
        skip,
        take,
        undefined,
        undefined,
      );
    });

    it('should return all products by company id', async () => {
      const companyId = companies[0].id;

      const foundProducts = products
        .filter((product) => product.companyId === companyId)
        .map((product) => ({
          ...product,
          comments: [],
          company: {},
        })) as (Product & { comments: Comment[]; company: Company })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundProducts);

      const result = await service.findAll(page, limit, companyId);

      expect(result).toEqual(foundProducts);
      expect(repository.findMany).toHaveBeenCalledWith(
        skip,
        take,
        companyId,
        undefined,
      );
    });
  });

  describe('find one', () => {
    const product = products[1];

    it('should return a single product', async () => {
      const { id } = product;

      const foundProduct = {
        ...product,
        comments: [],
        company: {},
      } as Product & { comments: Comment[]; company: Company };

      jest.spyOn(repository, 'findUnique').mockResolvedValue(foundProduct);

      const result = await service.findOne(id);

      expect(result).toEqual(foundProduct);
      expect(repository.findUnique).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const product = products[2];

    it('should update an existing product', async () => {
      const { id } = product;
      const data = validData as UpdateProductDto;

      const updatedProduct = {
        ...product,
        ...data,
        comments: [],
        company: {},
      } as Product & { comments: Comment[]; company: Company };

      jest.spyOn(repository, 'update').mockResolvedValue(updatedProduct);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedProduct);
      expect(repository.update).toHaveBeenCalledWith(id, data);
    });

    it('should return errors for invalid data', async () => {
      const data = plainToInstance(CreateProductDto, invalidData);

      const result = await validate(data);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('remove', () => {
    const product = products[3];

    it('should remove an existing product', async () => {
      const { id } = product;

      const deletedProduct = product as Product;

      jest.spyOn(repository, 'delete').mockResolvedValue(deletedProduct);

      const result = await service.remove(id);

      expect(result).toEqual(deletedProduct);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
