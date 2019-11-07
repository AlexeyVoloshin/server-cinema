import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { PlaceInterface } from '../interfaces/place.interface';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {
  }
  @Get()
  async findAll(): Promise<PlaceInterface[]> {
    return this.placesService.getTweets();
  }
  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    await this.placesService.create(createPlaceDto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    await this.placesService.update(updatePlaceDto);
  }

}
