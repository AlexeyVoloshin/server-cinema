import { Document } from 'mongoose';
export interface PlaceInterface extends Document {
  readonly row: string;
  readonly place: string;
  readonly select: boolean;
}
