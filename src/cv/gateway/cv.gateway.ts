import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { createCvDto } from '../dto/create-cv.dto';
import { CvService } from '../service/cv.service';

@WebSocketGateway()
export class CvGateway {
  constructor(private cvservice: CvService) {}
  @WebSocketServer() server;
  @SubscribeMessage('create-cv')
  handleCVEvent(@MessageBody() data: createCvDto): string {
    console.log(data);
    this.server.emit('cvs', data);
    return data + 'Hello';
    console.log('cvs', this.cvservice.cvs);
  }
}
//min 51//
