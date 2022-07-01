import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '../.env/dev.env' : 'product.env path',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
