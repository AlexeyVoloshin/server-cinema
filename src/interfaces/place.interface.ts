import { Document } from 'mongoose';
export interface PlaceInterface extends Document {
   row: string;
   place: string;
   select: boolean;
}
