import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { BoardStatus } from '../entities/board.entity';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  user_id: string;
  title: string;
  content: string;
  status: BoardStatus;
}
