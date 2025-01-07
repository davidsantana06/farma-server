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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @Get('/')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('companyId') companyId?: string,
    @Query('name') name?: string,
  ) {
    return await this.productService.findAll(
      page || 1,
      limit || 10,
      companyId,
      name,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return await this.productService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
