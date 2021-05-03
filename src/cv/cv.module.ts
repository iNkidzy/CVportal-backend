import { Module } from '@nestjs/common';
import { CvGateway } from './cv.gateway';

@Module({
  providers: [CvGateway],
})
export class CvModule {}
