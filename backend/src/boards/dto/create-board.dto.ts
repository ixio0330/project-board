import { BoardStatus } from '../entities/board.entity';

export class CreateBoardDto {
  user_id: string;
  title: string;
  content: string;
  status: BoardStatus;
}
