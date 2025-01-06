import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/')
  async create(@Body() data: CreateCompanyDto) {
    return await this.companyService.create(data);
  }

  @Get('/')
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return await this.companyService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }
}
