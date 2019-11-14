import { Document } from 'mongoose';
export interface PlaceInterface extends Document {
   row: number;
   place: number;
   select: boolean;
   bought: boolean;
}
