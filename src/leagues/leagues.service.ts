import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { League } from './interfaces/league.interface';
import { User } from 'src/users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Stage } from '../stages/interfaces/stage.interface';
import { Race } from '../races/interfaces/race.interface';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel('League')private readonly leagueModel: Model <League>,
              @InjectModel('User')private readonly userModel: Model <User>,
              @InjectModel('Stage')private readonly stageModel: Model <Stage>,
              @InjectModel('Race')private readonly raceModel: Model <Race>) {}

  async findAllLeagues(): Promise<League[]> {
    return await this.leagueModel.find();
  }

  async findLeagueById(id): Promise<League> {
    return await this.leagueModel.findOne({_id: id});
  }

  async createNewLeague(league: League): Promise<League> {
    const newLeague = new this.leagueModel(league);
    return newLeague.save();
  }

  async updateLeague(id: string, league: League): Promise<League> {
    return await this.leagueModel.findOneAndUpdate(id, league, {new: true});
  }

  async deleteLeague(id: string): Promise<League> {
    const stages = await this.stageModel.find({ leagueId: id });
    const stagesId = stages.map(stage => stage.id);
    for (let i = 0; i <= stagesId.length; i++) {
      await this.raceModel.deleteMany({ stageId: stagesId[i] });
    }
    await this.stageModel.deleteMany({ leagueId: id });
    return await this.leagueModel.deleteOne({ _id: id });
  }

  async addUserToLeague(id: string, userId: string): Promise<League> {
    const league = await this.leagueModel.findOne({_id: id});
    const user = await this.userModel.findOne({_id: userId});
    if (league.users.includes(userId)) {
      throw new Error('This user already in this league');
    }
    league.users.push(user._id);
    await league.save();
    return league;
  }
}
