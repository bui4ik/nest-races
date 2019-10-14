import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LeaguesModule } from './leagues/leagues.module';
import config from './config/keys';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false}),
    LeaguesModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
