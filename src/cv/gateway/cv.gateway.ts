import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { createCvDto } from '../dto/create-cv.dto';
import { CvService } from '../service/cv.service';
import { Cv } from '../shared/cv.model';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CvGateway {
  constructor(private cvService: CvService) {}

  @WebSocketServer() server;

  @SubscribeMessage('create-cv')
  handleCreateCVEvent(
    @MessageBody() data: createCvDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const cv: Cv = {
      name: data.name,
      description: data.description,
      education: data.education,
      experience: data.experience,
      skills: data.skills,
      contact: data.contact,
      image: data.image,
      video: data.video,
    };
    try {
      this.cvService.createCv(cv);
      client.emit('cv-created', data);
      this.server.emit('cv-created', data);
      this.server.emit('cvs', data);
    } catch (e) {
      client.emit('cv-error', e.message);
    }
  }

  /*
  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client is Connected', client.id);
    client.emit('allCvs', this.cvService.getAllCv());
    this.server.emit('clients', this.cvService.getClients());
  }

  handleDisconnect(client: Socket): any {
    this.chatService.delete(client.id);
    this.server.emit('clients', this.cvService.getClients());
    console.log('Client is Disconnected', this.cvService.getClients());
  }

 */
}

/* @SubscribeMessage('allCvs')
  handleCvEvent(@MessageBody() cv: CvDto): void {
    const cvs = this.cvService.getAllCvs();
    this.server.emit('allCvs', cvs);
  }
}*/
//min 51//
