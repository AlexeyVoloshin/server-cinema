import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { PlacesModule } from './places/places.module';
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
@Module({
  imports: [PlacesModule],
  providers: [AppGateway],
})
export class AppModule {}
