import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AcmDisable, AcmPublic } from '@secure-access-control';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AcmDisable()
  @AcmPublic()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }
}
