import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlaceInterface } from '../interfaces/place.interface';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { Place } from '../dto/place';

@Injectable()
export class PlacesService {
  private logger: Logger = new Logger('PlacesService');
  places: CreatePlaceDto[] = [];
  // select: PlaceInterface[] = [];
  constructor(@Inject('PLACE_MODEL') private readonly placeModel: Model<PlaceInterface>) {
  }
  async createPlace(createPlace: CreatePlaceDto[]): Promise<PlaceInterface> {
    try {
      const createPlaceDto = new this.placeModel();
      await createPlaceDto.collection.insertMany(createPlace);
      return await createPlaceDto.save();
    } catch (err) {
      this.logger.log('create place error: ', err);
    }
  }
  async getPlaces(): Promise<Place[]> { // get place from local db
    try {
      let result;
      result = await this.placeModel.find().exec();
      if (result.length === 0) {
      await this.createNewPlaces();
      result = await this.placeModel.find().exec();
    }
    return result;
    } catch (err) {
      this.logger.log('getPlace error: ', err);
    }
  }
  async updatePlace(id, data) {
    try {
      const updatePlace = await this.findPlace(id);
      if (data.row) {
        updatePlace.row = data.row;
      }
      if (data.place) {
        updatePlace.place = data.place;
      }
      if (data.select) {
        updatePlace.select = data.select;
      }
      await updatePlace.save();
    } catch (err) {
      this.logger.log('updatePlace error: ', err);
    }
  }
  async getSinglePlace(placeId: string): Promise<PlaceInterface> {
    return await this.findPlace(placeId);
  }
  private async findPlace(id: string): Promise<PlaceInterface> {
    let place;
    try {
        place =  await this.placeModel.findById(id);
    } catch (err) {
      this.logger.log('Could not find place.', err);
    }
    if (!place) {
      throw new NotFoundException('Could not find place.');
    }
    return place;
  }
  async createNewPlaces() {
    for ( let r = 1; r < 11; r++) {
      for ( let p = 1; p < 11; p++) {
        this.places.push({
          row : r,
          place : p,
          select : false,
          bought : false,
        });
      }
    }
    await this.createPlace(this.places);
  }
}
