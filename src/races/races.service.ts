import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Race } from './interfaces/race.interface';

@Injectable()
export class RacesService {
  constructor(@InjectModel('Race')private readonly raceModel: Model <Race>) {}

  async findAllRaces(): Promise<Race[]> {
    return await this.raceModel.find();
  }

  async findRaceById(id): Promise<Race> {
    return await this.raceModel.findOne({_id: id});
  }

  async createNewRace(race: Race): Promise<Race> {
    const newRace = new this.raceModel(race);
    return newRace.save();
  }

  async updateRace(id: string, race: Race): Promise<Race> {
    return await this.raceModel.findOneAndUpdate(id, race, {new: true});
  }

  async deleteRace(id: string): Promise<Race> {
    return await this.raceModel.findByIdAndRemove(id);
  }

  async racesWithStagesBySeason(season: string): Promise<any> {
    return await this.raceModel.aggregate([
      {
        $match: {
          season,
        },
      },
      {
        $lookup: {
          from: 'stages',
          localField: '_id',
          foreignField: 'leagueId',
          as: 'stages',
        },
      },
      { $project: { stages: 1, _id: 0 } },
      {
        $unwind: {
          path: '$stages',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'races',
          localField: 'stages._id',
          foreignField: 'stageId',
          as: 'stages.races',
        },
      },
    ]);
  }
}
