import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StageSchema } from './schemas/stage.schema';
import { StagesController } from './stages.controller';
import { RaceSchema } from '../races/schemas/races.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Stage', schema: StageSchema}, {name: 'Race', schema: RaceSchema} ]) ],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
