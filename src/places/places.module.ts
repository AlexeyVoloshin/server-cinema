import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { placesProviders } from './places.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PlacesService, ...placesProviders],
  controllers: [PlacesController],
  exports: [PlacesService],
})
export class PlacesModule {}
