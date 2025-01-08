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
    { id: 1 },
    { id: 2 },
  ];

  const commentaries = [
    {
      id: 1,
      productId: products[0].id,
      authorName: 'Alisson Rodrigues',
      authorEmail: 'alisson_rodrigues@gmail.com',
      content: 'Ótimo produto, recomendo!',
    },
    {
      id: 2,
      productId: products[1].id,
      authorName: 'Kaik Bomfim',
      authorEmail: 'kaik_bomfim@hotmail.com',
      content: 'Produto de qualidade!',
    },
    {
      id: 3,
      productId: products[0].id,
      authorName: 'Leonardo Andrade',
      authorEmail: 'leonardo_andrade@outlook.com',
      content: 'Muito bom!',
    },
    {
      id: 4,
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
    const page = 1;
    const limit = commentaries.length;

    it('should return all commentaries', async () => {
      const foundCommentaries = commentaries.map((commentary) => ({
        ...commentary,
        product: {},
      })) as (Commentary & { product: Product })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCommentaries);

      const result = await service.findAll(page, limit);

      expect(result).toEqual(foundCommentaries);
      expect(repository.findMany).toHaveBeenCalledWith(
        page - 1,
        limit,
        undefined,
      );
    });

    it('should return all commentaries by product id', async () => {
      const productId = products[0].id;

      const foundCommentaries = commentaries
        .filter((commentary) => commentary.productId === productId)
        .map((commentary) => ({
          ...commentary,
          product: {},
        })) as (Commentary & { product: Product })[];

      jest.spyOn(repository, 'findMany').mockResolvedValue(foundCommentaries);

      const result = await service.findAll(page, limit, productId);

      expect(result).toEqual(foundCommentaries);
      expect(repository.findMany).toHaveBeenCalledWith(
        page - 1,
        limit,
        productId,
      );
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
