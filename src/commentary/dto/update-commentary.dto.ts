import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentaryDto } from './create-commentary.dto';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {}
