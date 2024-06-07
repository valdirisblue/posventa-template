

import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { BxHttpService } from './http.service'
import { LoggerModule } from '../logging/logger.module'
const providers = [
  {
    provide:'USE_HTTP',
    useClass:BxHttpService
  }
]
@Module({
  imports:[
    LoggerModule,
    HttpModule.register({
      timeout:5000,
    })
  ],
  providers:[ ...providers ],
  exports:providers.map(p=>p.provide)
})
export class BxHttpModule {}
