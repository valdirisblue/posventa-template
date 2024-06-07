import { Module } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';

const providers = [
  {
    provide: 'USE_LOGGER',
    useClass: LoggerService,
  }
]
@Module({
  providers,
  exports: providers.map(p => p.provide),
})
export class LoggerModule {}