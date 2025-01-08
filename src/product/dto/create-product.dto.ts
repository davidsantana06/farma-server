import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @Min(1)
  companyId: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Length(1, 200)
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(1, 100)
  dosage: string;
}
