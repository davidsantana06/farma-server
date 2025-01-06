import { Injectable } from '@nestjs/common';
import { Commentary, Product } from '@prisma/client';
import { CommentaryRepository } from './commentary.repository';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

@Injectable()
export class CommentaryService {
  constructor(private readonly commentaryRepository: CommentaryRepository) {}

  create(data: CreateCommentaryDto): Promise<Commentary> {
    return this.commentaryRepository.create(data);
  }

  findAll(): Promise<(Commentary & { product: Product })[]> {
    return this.commentaryRepository.findMany();
  }

  findOne(id: string): Promise<Commentary & { product: Product }> {
    return this.commentaryRepository.findUnique(id);
  }

  update(
    id: string,
    data: UpdateCommentaryDto,
  ): Promise<Commentary & { product: Product }> {
    return this.commentaryRepository.update(id, data);
  }

  remove(id: string): Promise<Commentary> {
    return this.commentaryRepository.delete(id);
  }
}
