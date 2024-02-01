import { PinoService } from './pino.service';
import { ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  exports: [PinoService],
  providers: [PinoService, ConfigService],
})
export class PinoModule {}
