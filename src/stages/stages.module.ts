import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StageSchema } from './schemas/stage.schema';
import { StagesController } from './stages.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Stage', schema: StageSchema}]) ],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
