import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ParticipantsModule } from './participants/participants.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ParticipantsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/moonshots'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
