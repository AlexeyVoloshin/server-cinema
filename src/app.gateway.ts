import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { PlacesService } from './places/places.service';
import { Place } from './dto/place';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private placesService: PlacesService ) {
  }
 @WebSocketServer()
 server: Server;

   places: Place[];

   private logger: Logger = new Logger('AppGateway');

 async afterInit(server: Server) {
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

  @SubscribeMessage('update')
  updateSelected(
    @MessageBody() data: Place,
    @ConnectedSocket() client: Socket) {
    for (let val of this.places) {
      if (val['_doc']._id === data._id) {
        val['_doc'].select = data.select;
        val['_doc'].bought = data.bought;
        client.broadcast.emit('events');
      }
    }
  }

  @SubscribeMessage('get')
  async  getSelected(): Promise<Place[]> {
     return  this.places;
  }
}
