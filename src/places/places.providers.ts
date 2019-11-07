import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { PlaceSchema } from '../schemas/place.schema';

export const placesProviders = [
  {
    provide: 'PLACE_MODEL',
    useFactory: (connection: Connection) => connection.model('Place', PlaceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
