import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { getTodayTimestamp } from '../helper/timestamp';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  private board_id: number = 0;

  create(createBoardDto: CreateBoardDto): Board {
    const { user_id, title, content, status } = createBoardDto;
    const board: Board = {
      id: this.board_id,
      user_id,
      title,
      content,
      status,
      created_on: getTodayTimestamp(),
      updated_on: null,
    };
    this.boards.push(board);
    this.board_id++;

    return board;
  }

  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: number): Board {
    return this.boards.find((board) => board.id === id);
  }

  update(id: number, updateBoardDto: UpdateBoardDto): Board | boolean {
    try {
      const { user_id, title, content, status } = updateBoardDto;
      const updateBoard = this.findOne(id);

      if (user_id !== updateBoard.user_id) return false;

      const board = {
        ...updateBoard,
        title,
        content,
        status,
      };

      this.boards = [...this.boards, board];

      return board;
    } catch (err) {
      return false;
    }
  }

  remove(id: number): Board[] {
    this.boards = this.boards.filter((board) => board.id !== id);
    return this.boards;
  }
}
