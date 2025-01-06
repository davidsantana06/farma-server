import {
  Body,
  Controller,
  Delete,
  Get,
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
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('/company/:companyId')
  async findAllByCompanyId(@Param('companyId') companyId: string) {
    return await this.productService.findAllByCompanyId(companyId);
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
