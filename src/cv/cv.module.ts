import { Module } from '@nestjs/common';
import { CvGateway } from './cv.gateway';
import { CvService } from './service/cv.service';

@Module({
  providers: [CvGateway, CvService],
})
export class CvModule {}
