import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const StageSchema = new mongoose.Schema({
  title: String,
  description: String,
  geolocation: [Number],
  leagueId: [Schema.Types.ObjectID],
});
