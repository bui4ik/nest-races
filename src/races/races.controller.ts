import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RacesService } from './races.service';
import { Race } from './interfaces/race.interface';
import { CreateRaceDto} from './dto/create-race.dto';

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Get('/racesWithStagesBySeason/:season')
  racesWithStagesBySeason(@Param('season') season): Promise <any> {
    return this.racesService.racesWithStagesBySeason(season);
  }

  @Get()
  getAllRaces(): Promise<Race[]> {
    return this.racesService.findAllRaces();
  }

  @Get(':id')
  findRaceById(@Param('id') id): Promise<Race> {
    return this.racesService.findRaceById(id);
  }

  @Post()
  createNewRace(@Body() createRaceDto: CreateRaceDto): Promise<Race> {
    return this.racesService.createNewRace(createRaceDto);
  }

  @Put(':id')
  updateRace(@Param('id') id, @Body() updateRaceDtO: CreateRaceDto): Promise<Race> {
    return this.racesService.updateRace(id, updateRaceDtO);
  }

  @Delete(':id')
  deleteStage(@Param('id') id): Promise<Race> {
    return this.racesService.deleteRace(id);
  }
}
