import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantSchema } from './participants.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Participant', schema: ParticipantSchema },
    ]),
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
