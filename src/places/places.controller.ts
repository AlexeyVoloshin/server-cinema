import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { PlaceInterface } from '../interfaces/place.interface';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {
  }
  @Get()
  async getAllPlaces(): Promise<PlaceInterface[]> {
    return this.placesService.getPlaces();
  }
  @Get(':id')
  async getPlace(@Param('id') placeId: string): Promise<PlaceInterface> {
    return this.placesService.getSinglePlace(placeId);
  }
  @Post()
  async createMany(@Body() createPlaceDto: CreatePlaceDto[]) {
    await this.placesService.createPlace(createPlaceDto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() place: string) {
    await this.placesService.updatePlace(id, place);
  }
}
