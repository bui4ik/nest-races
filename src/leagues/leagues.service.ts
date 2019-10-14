import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { League } from './interfaces/league.interface';
import { User } from 'src/users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel('League')private readonly leagueModel: Model <League>,
              @InjectModel('User')private readonly userModel: Model <User>) {}

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
    // change after all
    return await this.leagueModel.findByIdAndRemove(id);
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
