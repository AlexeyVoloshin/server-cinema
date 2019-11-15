import { Document } from 'mongoose';
export interface PlaceInterface extends Document {
   _id: string;
   row: number;
   place: number;
   select: boolean;
   bought: boolean;
}
