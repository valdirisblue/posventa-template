import { Module } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';
import {BxHttpModule} from "./http/http.module";

@Module({
  imports: [
      BxHttpModule,
      TokensModule
  ],
  providers:[],
  exports: [BxHttpModule,TokensModule],
})
export class InfraestructureModule {}
