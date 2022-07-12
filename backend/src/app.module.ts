import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './module/boards/boards.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [BoardsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
