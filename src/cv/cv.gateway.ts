import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class CvGateway {
  @WebSocketServer() server;
  @SubscribeMessage('cvs')
  handleCVEvent(@MessageBody() data: string): string {
    console.log(data);
    this.server.emit('cvs', data);
    return data + 'Hello';
  }
}
