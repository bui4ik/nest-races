import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const RaceSchema = new mongoose.Schema({
  title: String,
  time: String,
  description: String,
  userId: Schema.Types.ObjectID,
  stageId: Schema.Types.ObjectID,
});
