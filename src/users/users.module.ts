import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema} from './schemas/user.schema';
import { RaceSchema } from '../races/schemas/races.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Race', schema: RaceSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
