import * as mongoose from 'mongoose';

export const PlaceSchema = new mongoose.Schema({
  row: {
    type: Number,
    require: true,
  },
  place: {
    type: Number,
    require: true,
  },
  select: {
    type: Boolean,
    require: true,
  },
  bought: {
    type: Boolean,
    require: true,
  },
});
