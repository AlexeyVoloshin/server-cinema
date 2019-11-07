import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [PlacesModule],
  providers: [AppGateway],
})
export class AppModule {}
