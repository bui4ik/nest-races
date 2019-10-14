import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RaceSchema } from './schemas/races.schema';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Race', schema: RaceSchema}]) ],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
