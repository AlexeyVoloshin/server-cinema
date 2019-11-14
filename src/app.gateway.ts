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

@WebSocketGateway()
// export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 @WebSocketServer()
 server: Server;

  selected: PlaceInterface[] = [];

   private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
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


  @SubscribeMessage('send')
  async  sendSelected(@MessageBody() data: PlaceInterface[]): Promise<PlaceInterface[]> {
   // debugger
    this.selected = data;
    return this.selected;
  }
  @SubscribeMessage('get')
  async  getSelected(@MessageBody() id: string): Promise<number> {
    // debugger
    // this.selected = data;
    for (let data of this.selected) {
      if (data._id === id) {
        return 1;
      }
    }
    return 0;
  }
}
