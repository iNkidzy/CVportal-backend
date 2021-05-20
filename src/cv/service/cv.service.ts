import { Injectable } from '@nestjs/common';
import { Cv } from '../shared/cv.model';
import { v4 as uuidv4 } from 'uuid';
import { createCvDto } from '../dto/create-cv.dto';
import { CvDto } from '../dto/cv.dto';

@Injectable()
export class CvService {
  public cvs: Cv[] = [];

  createCv(cv: Cv): Cv {
    cv.id = uuidv4;
    this.cvs.push(cv);
    return cv;
  }

 /* getAllCvs(): CvDto[] {
    return this.cvs;
  }*/
  deleteCv(id: string): void {
    this.cvs = this.cvs.filter((c) => c.id !== id);
  }
}
