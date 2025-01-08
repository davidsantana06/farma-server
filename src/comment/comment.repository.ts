import { Injectable } from '@nestjs/common';
import { Comment, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto): Promise<Comment> {
    const { productId, ...rest } = data;
    return this.prisma.comment.create({
      data: {
        ...rest,
        product: { connect: { id: productId } },
      },
    });
  }

  findMany(
    skip: number,
    take: number,
    productId?: number,
  ): Promise<(Comment & { product: Product })[]> {
    return this.prisma.comment.findMany({
      where: productId ? { productId } : {},
      orderBy: { createdAt: 'desc' },
      include: { product: true },
      skip,
      take,
    });
  }

  findUnique(id: number): Promise<Comment & { product: Product }> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  update(
    id: number,
    data: UpdateCommentDto,
  ): Promise<Comment & { product: Product }> {
    return this.prisma.comment.update({
      where: { id },
      data,
      include: { product: true },
    });
  }

  delete(id: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } });
  }
}
