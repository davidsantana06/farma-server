import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentaryController } from './commentary.controller';
import { CommentaryRepository } from './commentary.repository';
import { CommentaryService } from './commentary.service';

@Module({
  controllers: [CommentaryController],
  providers: [CommentaryService, CommentaryRepository],
  imports: [PrismaModule],
})
export class CommentaryModule {}
