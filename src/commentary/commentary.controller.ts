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
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

@Controller('/commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Post('/')
  async create(@Body() data: CreateCommentaryDto) {
    return await this.commentaryService.create(data);
  }

  @Get('/')
  async findAll(@Query('productId') productId?: string) {
    return await this.commentaryService.findAll(productId);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.commentaryService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateCommentaryDto) {
    return await this.commentaryService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.commentaryService.remove(id);
  }
}
