import { Injectable } from '@nestjs/common';
import { Cv } from '../shared/cv.model';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class CvService {
  cvs: Cv[] = [];
  CreateCV(cv: Cv) {
    cv.id = uuidv4();
    this.cvs.push(cv);
  }
}
