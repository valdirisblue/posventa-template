import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { TokensModule   } from '@infraestructure/tokens/tokens.module';
import { Healt } from './controllers/heal.controller';

@Module({
  imports: [
    TokensModule,
    ServicesModule
  ],
  controllers: [Healt],
})
export class ApiModule {}
