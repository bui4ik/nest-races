import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stage } from './interfaces/stage.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StagesService {
  constructor(@InjectModel('Stage')private readonly stageModel: Model <Stage>) {}

  async findAllStages(): Promise<Stage[]> {
    return await this.stageModel.find();
  }

  async findStageById(id): Promise<Stage> {
    return await this.stageModel.findOne({_id: id});
  }

  async createNewStage(stage: Stage): Promise<Stage> {
    const newStage = new this.stageModel(stage);
    return newStage.save();
  }

  async updateStage(id: string, stage: Stage): Promise<Stage> {
    return await this.stageModel.findOneAndUpdate(id, stage, {new: true});
  }

  async deleteStage(id: string): Promise<Stage> {
    // change after all
    return await this.stageModel.findByIdAndRemove(id);
  }

  async addLeagueToStage(id: string, leagueId: string): Promise<Stage> {
    const stage = await this.stageModel.findById(id);
    stage.league = leagueId;
    await stage.save();
    return stage;
  }
}
