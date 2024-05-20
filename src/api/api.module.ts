import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { TokensModule   } from '@infraestructure/tokens/tokens.module';
import { PersonController } from './controllers/person.controller';

@Module({
  imports: [
    TokensModule,
    ServicesModule
  ],
  controllers: [PersonController],
})
export class ApiModule {}
