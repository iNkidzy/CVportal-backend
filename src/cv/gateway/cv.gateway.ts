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

  @SubscribeMessage('allCvs')
  async handleCvEvent(): Promise<void> {
    try {
      const cvs = await this.cvservice.getAllCvs();
      this.server.emit('allCvs', cvs);
    } catch (e) {
      console.log(e.message);
    }
  }
}
//min 51//
