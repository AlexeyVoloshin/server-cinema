import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlaceInterface } from '../interfaces/place.interface';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
@Injectable()
export class PlacesService {
  private logger: Logger = new Logger('PlacesService');
  constructor(@Inject('PLACE_MODEL') private readonly placeModel: Model<PlaceInterface>) {
  }

  async create(createPlace: CreatePlaceDto): Promise<PlaceInterface> {
    try {
      const createPlaceDto = new this.placeModel();
      createPlaceDto.collection.insert(createPlace);
      return await createPlaceDto.save();
    } catch (err) {
      this.logger.log('create place error: ', err);
    }
  }
  async getTweets(): Promise<PlaceInterface[]> { // get place from local db
    try {
      return await this.placeModel.find({});
    } catch (err) {
      this.logger.log('getPlace error: ', err);
    }
  }

  async update(updatePlaceDto: UpdatePlaceDto) {
    try{

    } catch (err) {
      this.logger.log('updatePlace error: ', err);
    }
  }
}
