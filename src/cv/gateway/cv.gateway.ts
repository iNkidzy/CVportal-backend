import {
  // ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  // WebSocketServer,
} from '@nestjs/websockets';
import { createCvDto } from '../dto/create-cv.dto';
import { CvService } from '../service/cv.service';
import { Cv } from '../shared/cv.model';

@WebSocketGateway()
export class CvGateway {
  constructor(private cvService: CvService) {}

  @SubscribeMessage('create-cv')
  handleCreateCVEvent(@MessageBody() data: createCvDto): void {
    const cv: Cv = {
      name: data.name,
      description: data.description,
      education: data.education,
      experience: data.experience,
      contact: data.contact,
    };
    try {
      this.cvService.createCv(cv);
    } catch (e) {
      return e.message;
    }
  }
}
