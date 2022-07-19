import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(+id);
  }
}
