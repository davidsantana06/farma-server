import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentaryDto {
  @IsUUID()
  productId: string;

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
