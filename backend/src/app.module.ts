import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
