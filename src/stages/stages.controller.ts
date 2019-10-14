import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Stage } from './interfaces/stage.interface';
import { AddLeagueToStageDto } from './dto/add-league-to-stage.dto'
import { CreateStageDto } from './dto/create-stage.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stageService: StagesService) {}

  @Post(':id/league')
  addLeagueToStage(@Param('id')id, @Body() addLeagueToStageDto: AddLeagueToStageDto): Promise<Stage> {
    return this.stageService.addLeagueToStage(id, addLeagueToStageDto.id);
  }

  @Get()
  getAllStage(): Promise<Stage[]> {
    return this.stageService.findAllStages();
  }

  @Get(':id')
  findStageById(@Param('id') id): Promise<Stage> {
    return this.stageService.findStageById(id);
  }

  @Post()
  createNewStage(@Body() createStageDto: CreateStageDto): Promise<Stage> {
    return this.stageService.createNewStage(createStageDto);
  }

  @Put(':id')
  updateStage(@Param('id') id, @Body() updateStageDtO: CreateStageDto): Promise<Stage> {
    return this.stageService.updateStage(id, updateStageDtO);
  }

  @Delete(':id')
  deleteStage(@Param('id') id): Promise<Stage> {
    return this.stageService.deleteStage(id);
  }
}
