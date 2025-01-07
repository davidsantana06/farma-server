import { Test, TestingModule } from '@nestjs/testing';
import { Commentary, Product } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CommentaryRepository } from './commentary.repository';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

describe('CommentaryService', () => {
  const products = [
    { id: 'd3cb1bd0-9365-43c4-be89-e484e8bf48a5' },
    { id: '317c7ae0-bcb2-4b35-8490-753ed9b79443' },
  ];

  const commentaries = [
    {
      id: '4002f37f-bfc1-4478-afa3-924bcb59d806',
      productId: products[0].id,
      authorName: 'Alisson Rodrigues',
      authorEmail: 'alisson_rodrigues@gmail.com',
      content: 'Ótimo produto, recomendo!',
    },
    {
      id: '6d0599ac-e8ad-41f7-bc04-c725db756d5c',
      productId: products[1].id,
      authorName: 'Kaik Bomfim',
      authorEmail: 'kaik_bomfim@hotmail.com',
      content: 'Produto de qualidade!',
    },
    {
      id: 'cb1e5cde-ab6c-4bd0-bbb3-a3ecbc61ac26',
      productId: products[0].id,
      authorName: 'Leonardo Andrade',
      authorEmail: 'leonardo_andrade@outlook.com',
      content: 'Muito bom!',
    },
    {
      id: '6d135a7f-acf1-45a9-bfdb-bb7c7d459fe5',
      productId: products[1].id,
      authorName: 'Pedro Vitor',
      authorEmail: 'pedro_vitor@yahoo.com',
      content: 'Recomendo!',
    },
  ];

  const validData = {
    content: 'Gostei muito!',
  };

  const invalidData = {
    content: 7,
  };

  let repository: CommentaryRepository;
  let service: CommentaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentaryService,
        {
          provide: CommentaryRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findManyByProductId: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CommentaryRepository>(CommentaryRepository);
    service = module.get<CommentaryService>(CommentaryService);
  });

  describe('create', () => {
    const commentary = commentaries[0];

    it('should create a new commentary', async () => {
      const data = commentary as CreateCommentaryDto;

      const createdCommentary = commentary as Commentary;

      jest.spyOn(repository, 'create').mockResolvedValue(createdCommentary);

      const result = await service.create(data);

      expect(result).toEqual(createdCommentary);
      expect(repository.create).toHaveBeenCalledWith(data);
    });
  });

  describe('find all', () => {
    it('should return all commentaries', async () => {
      const foundCommentaries = commentaries.map((commentary) => ({
        ...commentary,
        product: {},
      })) as (Commentary & { product: Product })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCommentaries);

      const result = await service.findAll();

      expect(result).toEqual(foundCommentaries);
      expect(repository.findMany).toHaveBeenCalled();
    });

    it('should return all commentaries by product id', async () => {
      const productId = products[0].id;

      const foundCommentaries = commentaries
        .filter((commentary) => commentary.productId === productId)
        .map((commentary) => ({
          ...commentary,
          product: {},
        })) as (Commentary & { product: Product })[];

      jest
        .spyOn(repository, 'findManyByProductId')
        .mockResolvedValue(foundCommentaries);

      const result = await service.findAllByProductId(productId);

      expect(result).toEqual(foundCommentaries);
      expect(repository.findManyByProductId).toHaveBeenCalledWith(productId);
    });
  });

  describe('find one', () => {
    const commentary = commentaries[1];

    it('should return a single commentary', async () => {
      const { id } = commentary;

      const foundCommentary = {
        ...commentary,
        product: {},
      } as Commentary & { product: Product };

      jest.spyOn(repository, 'findUnique').mockResolvedValue(foundCommentary);

      const result = await service.findOne(id);

      expect(result).toEqual(foundCommentary);
      expect(repository.findUnique).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    const commentary = commentaries[2];

    it('should update an existing commentary', async () => {
      const { id } = commentary;
      const data = validData as UpdateCommentaryDto;

      const updatedCommentary = {
        ...commentary,
        ...data,
        product: {},
      } as Commentary & { product: Product };

      jest.spyOn(repository, 'update').mockResolvedValue(updatedCommentary);

      const result = await service.update(id, data);

      expect(result).toEqual(updatedCommentary);
      expect(repository.update).toHaveBeenCalledWith(id, data);
    });

    it('should return errors for invalid data', async () => {
      const data = plainToInstance(CreateCommentaryDto, invalidData);

      const result = await validate(data);

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('remove', () => {
    const commentary = commentaries[3];

    it('should remove an existing commentary', async () => {
      const { id } = commentary;

      const deletedCommentary = commentary as Commentary;

      jest.spyOn(repository, 'delete').mockResolvedValue(deletedCommentary);

      const result = await service.remove(id);

      expect(result).toEqual(commentary);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
