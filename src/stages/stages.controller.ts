import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Stage } from './interfaces/stage.interface';
import { AddLeagueToStageDto } from './dto/add-league-to-stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Stages')
@Controller('stages')
export class StagesController {
  constructor(private readonly stageService: StagesService) {}

  @Post(':id/league')
  @ApiOperation({title: 'Add stage to league'})
  addLeagueToStage(@Param('id')id, @Body() addLeagueToStageDto: AddLeagueToStageDto): Promise<Stage> {
    return this.stageService.addLeagueToStage(id, addLeagueToStageDto.id);
  }

  @Get()
  @ApiOperation({title: 'Get all stages'})
  getAllStage(): Promise<Stage[]> {
    return this.stageService.findAllStages();
  }

  @Get(':id')
  @ApiOperation({title: 'Find stage by id'})
  findStageById(@Param('id') id): Promise<Stage> {
    return this.stageService.findStageById(id);
  }

  @Post()
  @ApiOperation({title: 'Create new stage'})
  createNewStage(@Body() createStageDto: CreateStageDto): Promise<Stage> {
    return this.stageService.createNewStage(createStageDto);
  }

  @Put(':id')
  @ApiOperation({title: 'Update stage'})
  updateStage(@Param('id') id, @Body() updateStageDtO: CreateStageDto): Promise<Stage> {
    return this.stageService.updateStage(id, updateStageDtO);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete stage'})
  deleteStage(@Param('id') id): Promise<Stage> {
    return this.stageService.deleteStage(id);
  }
}
