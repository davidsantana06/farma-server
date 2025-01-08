import { IsEmail, IsInt, IsString, Length, Min } from 'class-validator';

export class CreateCommentaryDto {
  @IsInt()
  @Min(1)
  productId: number;

  @IsString()
  @Length(1, 50)
  authorName: string;

  @IsEmail()
  @Length(1, 75)
  authorEmail: string;

  @IsString()
  @Length(1, 500)
  content: string;
}
