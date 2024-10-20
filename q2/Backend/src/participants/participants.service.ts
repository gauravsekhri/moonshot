import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './participants.model';
import { Model } from 'mongoose';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { isValidDate } from 'src/utils/helperFunctions';
import ApiResponse from 'src/utils/ApiResponse';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel('Participant')
    private readonly ParticipantModel: Model<Participant>,
  ) {}

  async uploadData(file: any) {
    const csvFile = readFileSync(file.destination + '/' + file.filename);
    const csvData = csvFile.toString();

    const parsedCSV = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        let lowerHeader = header.trim().toLowerCase();
        // if (lowerHeader.length == 1) lowerHeader = `col_${lowerHeader}`;
        return lowerHeader;
      },
      complete: (results) => results.data,
    });

    let finalData = [];
    let csvRawdata = JSON.parse(JSON.stringify(parsedCSV.data));

    for (let i = 0; i < csvRawdata.length; i++) {
      let itrDate = csvRawdata[i]['day'].trim();
      let dateSplit = itrDate.split('-');
      let finalDateStr = `${dateSplit[1]}-${dateSplit[0]}-${dateSplit[2]}`;

      let converteddate = new Date(finalDateStr);

      if (!isValidDate(converteddate)) console.log(finalDateStr);

      finalData.push({
        ...csvRawdata[i],
        day: converteddate,
      });
    }

    const result = await this.ParticipantModel.insertMany(finalData);
    return finalData;
  }

  async filteredData(payload) {
    console.log(payload);
    const { age, gender, startDate, endDate } = payload;

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const data = await this.ParticipantModel.aggregate([
      {
        $match: {
          age: age,
          gender: gender,
          // ...(startDate && endDate && day),
          day: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          a: { $avg: '$a' },
          b: { $avg: '$b' },
          c: { $avg: '$c' },
          d: { $avg: '$d' },
          e: { $avg: '$e' },
          f: { $avg: '$f' },
        },
      },
      {
        $project: {
          _id: 0,
          valuesArray: [
            { $round: ['$a', 2] },
            { $round: ['$b', 2] },
            { $round: ['$c', 2] },
            { $round: ['$d', 2] },
            { $round: ['$e', 2] },
            { $round: ['$f', 2] },
          ],
        },
      },
    ]);

    let finalData = [];

    if (data.length > 0) {
      finalData = data?.[0]?.valuesArray;
    }

    return new ApiResponse(true, 200, 'Data found', finalData);
  }

  async getParticipantData(payload) {
    const { age, gender, startDate, endDate, category } = payload;

    const data = await this.ParticipantModel.aggregate([
      {
        $match: {
          age: age,
          gender: gender,
          day: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: '$day',
          [category]: { $avg: '$' + category },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          day: '$_id',
          val: '$' + category,
          _id: 0,
        },
      },
    ]);

    console.log(data);

    return new ApiResponse(true, 200, 'Data found', data);
  }
}
