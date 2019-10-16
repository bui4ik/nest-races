import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LeaguesModule } from './leagues/leagues.module';
import { StagesModule } from './stages/stages.module';
import { RacesModule } from './races/races.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false}),
    LeaguesModule,
    StagesModule,
    RacesModule,
    AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
