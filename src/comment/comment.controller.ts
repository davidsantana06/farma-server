import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  async create(@Body() data: CreateCommentDto) {
    return await this.commentService.create(data);
  }

  @Get('/')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('productId') productId?: number,
  ) {
    return await this.commentService.findAll(
      page || 1,
      limit || 10,
      productId,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.commentService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return await this.commentService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.commentService.remove(id);
  }
}
