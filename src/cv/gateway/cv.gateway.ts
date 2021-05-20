import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { createCvDto } from '../dto/create-cv.dto';
import { CvService } from '../service/cv.service';
import { CvDto } from '../dto/cv.dto';
import { Cv } from '../shared/cv.model';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CvGateway {
  constructor(private cvService: CvService) {}

  @WebSocketServer() server;

  @SubscribeMessage('create-cv')
  handleCVEvent(
    @MessageBody() data: createCvDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const cv: Cv = {
      name: data.name,
      education: data.education,
      skills: data.skills,
      experience: data.experience,
      image: data.image,
      contact: data.contact,
      video: data.video,
    };
    try {
      console.log(data);
      this.cvService.createCv(cv);
      client.emit('cv-created', data);
      this.server.emit('cvs', data);
      console.log('cvs', this.cvService.cvs);
    } catch (e) {
      client.emit('cv-error', e.message);
    }
  }
}

/* @SubscribeMessage('allCvs')
  handleCvEvent(@MessageBody() cv: CvDto): void {
    const cvs = this.cvService.getAllCvs();
    this.server.emit('allCvs', cvs);
  }
}*/
//min 51//
