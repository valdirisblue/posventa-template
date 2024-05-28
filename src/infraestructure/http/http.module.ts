

import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { BxHttpService } from './http.service'
const providers = [
  {
    provide:'USE_HTTP',
    useClass:BxHttpService
  }
]
@Module({
  imports:[
    HttpModule.register({
      timeout:5000,
    })
  ],
  providers:[ ...providers ],
  exports:providers.map(p=>p.provide)
})
export class BxHttpModule {}
