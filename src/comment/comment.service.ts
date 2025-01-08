import { Injectable } from '@nestjs/common';
import { Comment, Product } from '@prisma/client';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(data: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create(data);
  }

  findAll(
    page: number,
    limit: number,
    productId?: number,
  ): Promise<(Comment & { product: Product })[]> {
    return this.commentRepository.findMany(
      (page - 1) * limit,
      limit,
      productId,
    );
  }

  findOne(id: number): Promise<Comment & { product: Product }> {
    return this.commentRepository.findUnique(id);
  }

  update(
    id: number,
    data: UpdateCommentDto,
  ): Promise<Comment & { product: Product }> {
    return this.commentRepository.update(id, data);
  }

  remove(id: number): Promise<Comment> {
    return this.commentRepository.delete(id);
  }
}
