import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';
import { InfraestructureModule } from '../infraestructure/infraestructure.module';
import { DomainModule } from '../domain/domain.module';
import { PersonService } from './person.service';

const serviceProviders: Provider[] = [
  {
    provide: 'PERSON_SERVICE',
    useClass: PersonService,
  },
];

@Module({
  imports: [DomainModule, InfraestructureModule],
  providers: [
    ...serviceProviders
  ],
  exports:[
    ...serviceProviders
  ],
})
export class ServicesModule {}
