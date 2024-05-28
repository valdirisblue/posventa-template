import { Module } from '@nestjs/common'
import { ConfigModueEnv } from '../config/config.module';
import { TokensServices } from './tokens.service';
import { BxHttpModule } from "../http/http.module";
const providers = [
  {
    provide:'USE_TOKENS',
    useClass:TokensServices
  }
]
@Module({
  imports:[
    ConfigModueEnv,
    BxHttpModule
  ],
  providers:[
    ...providers
  ],
  exports:providers.map(p=>p.provide)
})
export class TokensModule{}