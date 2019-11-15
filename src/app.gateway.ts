import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceInterface } from './interfaces/place.interface';
import { PlacesService } from './places/places.service';
import { CreatePlaceDto } from './dto/create-place.dto';

@WebSocketGateway()
// export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private placesService: PlacesService ) {
  }
 @WebSocketServer()
 server: Server;

   places: CreatePlaceDto[] = [];

   private logger: Logger = new Logger('AppGateway');

 async afterInit(server: Server) {
    // debugger;
    await this.placesService.getPlaces().then(data => {
      this.places = data;
    });

    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   const event = 'events';
  //   const response = [1, 2, 3];
  //   return from(response).pipe(
  //     map(data => ({ event, data })),
  //   );
  // }
  // @SubscribeMessage('identity')
  // async  identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }

  @SubscribeMessage('save')
  sendSelected(@MessageBody() data: PlaceInterface[]) {
    // debugger
    //  this.selected = data;
    //  return this.selected;
  }

  @SubscribeMessage('get')
  async  getSelected(): Promise<CreatePlaceDto[]> {
    // this.selected;
     return  this.places;
  }
}
