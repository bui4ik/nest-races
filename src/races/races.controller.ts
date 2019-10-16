import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RacesService } from './races.service';
import { Race } from './interfaces/race.interface';
import { CreateRaceDto} from './dto/create-race.dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Races')
@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Get('/racesWithStagesBySeason/:season')
  @ApiOperation({title: 'Races with stages by season'})
  racesWithStagesBySeason(@Param('season') season): Promise <any> {
    return this.racesService.racesWithStagesBySeason(season);
  }

  @Get()
  @ApiOperation({title: 'Get all races'})
  getAllRaces(): Promise<Race[]> {
    return this.racesService.findAllRaces();
  }

  @Get(':id')
  @ApiOperation({title: 'Get race by id'})
  findRaceById(@Param('id') id): Promise<Race> {
    return this.racesService.findRaceById(id);
  }

  @Post()
  @ApiOperation({title: 'Create new race'})
  createNewRace(@Body() createRaceDto: CreateRaceDto): Promise<Race> {
    return this.racesService.createNewRace(createRaceDto);
  }

  @Put(':id')
  @ApiOperation({title: 'Update race'})
  updateRace(@Param('id') id, @Body() updateRaceDtO: CreateRaceDto): Promise<Race> {
    return this.racesService.updateRace(id, updateRaceDtO);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete race'})
  deleteStage(@Param('id') id): Promise<Race> {
    return this.racesService.deleteRace(id);
  }
}
