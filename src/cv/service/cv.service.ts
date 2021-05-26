import { Injectable } from '@nestjs/common';
import { Cv } from '../shared/cv.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CvService {
  public cvs: Cv[] = [];

  createCv(cv: Cv): Cv {
    cv.id = uuidv4;
    this.cvs.push(cv);
    return cv;
  }
}
