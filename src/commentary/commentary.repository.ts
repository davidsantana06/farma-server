import { Injectable } from '@nestjs/common';
import { Commentary, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

@Injectable()
export class CommentaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentaryDto): Promise<Commentary> {
    const { productId, ...rest } = data;
    return this.prisma.commentary.create({
      data: {
        ...rest,
        product: { connect: { id: productId } },
      },
    });
  }

  findMany(productId?: string): Promise<(Commentary & { product: Product })[]> {
    return this.prisma.commentary.findMany({
      where: productId ? { productId } : {},
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    });
  }

  findUnique(id: string): Promise<Commentary & { product: Product }> {
    return this.prisma.commentary.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  update(
    id: string,
    data: UpdateCommentaryDto,
  ): Promise<Commentary & { product: Product }> {
    return this.prisma.commentary.update({
      where: { id },
      data,
      include: { product: true },
    });
  }

  delete(id: string): Promise<Commentary> {
    return this.prisma.commentary.delete({ where: { id } });
  }
}
