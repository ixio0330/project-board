import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { v1 as uuid } from 'uuid';
import { getTodayTimestamp } from '../helper/timestamp';

@Injectable()
export class BoardsService {
  private boards = [];

  create(createBoardDto: CreateBoardDto): Board {
    const { user_id, title, content, status } = createBoardDto;
    const board: Board = {
      id: uuid,
      user_id,
      title,
      content,
      status,
      created_on: getTodayTimestamp(),
      updated_on: null,
    };
    this.boards.push(board);

    return board;
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
