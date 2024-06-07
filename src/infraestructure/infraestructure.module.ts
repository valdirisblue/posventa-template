import { Module } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';
import {BxHttpModule} from "./http/http.module";
import { LoggerModule } from './logging/logger.module'
@Module({
  imports: [
      LoggerModule,
      BxHttpModule,
      TokensModule
  ],
  providers:[],
  exports: [
    LoggerModule,
    BxHttpModule,
    TokensModule
  ],
})
export class InfraestructureModule {}
