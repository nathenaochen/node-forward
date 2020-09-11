import { Module,HttpModule } from '@nestjs/common';
import {ApiController} from './api.controller';
import {ApiService} from './api.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers:[ApiController],
  providers:[ApiService]
})
export class ApiModule {}
