import { IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(1, 50)
  name: string;
}
