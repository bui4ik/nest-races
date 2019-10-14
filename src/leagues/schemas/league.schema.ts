import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const LeagueSchema = new mongoose.Schema({
  title: String,
  description: String,
  season: String,
  users: [Schema.Types.ObjectID],
});
