import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  companyId: string;

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
