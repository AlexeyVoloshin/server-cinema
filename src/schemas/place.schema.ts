import * as mongoose from 'mongoose';

export const PlaceSchema = new mongoose.Schema({
  row: {
    type: String,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
  select: {
    type: Boolean,
    require: true,
  },
});
