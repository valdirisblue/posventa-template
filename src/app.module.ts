import { Module } from '@nestjs/common';
import { ApiModule } from '@api/api.module';
import { InfraestructureModule } from '@infraestructure/infraestructure.module'
import { ServicesModule } from '@services/services.module'
import { DomainModule } from '@domain/domain.module';
import { ConfigModueEnv } from '@infraestructure/config/config.module';
import { TokensModule } from '@infraestructure/tokens/tokens.module';

@Module({
  imports: [
    ConfigModueEnv,
    TokensModule,
    ApiModule,
    DomainModule,
    ServicesModule,
    InfraestructureModule,
  ],
})
export class AppModule {}
