import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
@WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('place', (data) => {
      return data + 'dfgdfg';
    } );
    this.logger.log(`Client connected: ${client.id}`);
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text};
  }
}
