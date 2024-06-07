import { Module,MiddlewareConsumer ,NestModule} from '@nestjs/common';
import { ApiModule } from '@api/api.module';
import { InfraestructureModule } from '@infraestructure/infraestructure.module'
import { ServicesModule } from '@services/services.module'
import { DomainModule } from '@domain/domain.module';
import { ConfigModueEnv } from '@infraestructure/config/config.module';
import { TokensModule } from '@infraestructure/tokens/tokens.module';
import LoggerMiddleware from '@api/middlewares/logger.middleware';

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
export class AppModule implements NestModule{
  configure(cosumer:MiddlewareConsumer){
    cosumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
