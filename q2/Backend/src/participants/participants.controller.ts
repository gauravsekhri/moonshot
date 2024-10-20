import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/participants')
export class ParticipantsController {
  constructor(private readonly ParticipantsService: ParticipantsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async newValidate(@UploadedFile() file) {
    return this.ParticipantsService.uploadData(file);
  }

  @Get('filtered-data')
  async getData(
    @Query('age') age: string,
    @Query('gender') gender: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.ParticipantsService.filteredData({
      age,
      gender,
      startDate,
      endDate,
    });
  }

  @Get('category-data')
  async getCategoryData(
    @Query('age') age: string,
    @Query('gender') gender: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('category') category: string,
  ) {
    return await this.ParticipantsService.getParticipantData({
      age,
      gender,
      startDate,
      endDate,
      category,
    });
  }

  // @Get('participant-data')
  // async getSingleData() {
  //   return await this.ParticipantsService.getParticipantData({
  //     participant: 'a',
  //   });
  // }
}
