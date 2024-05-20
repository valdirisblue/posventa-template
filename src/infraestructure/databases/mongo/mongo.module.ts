import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { PersonEntity, PersonSchema } from './schemas/person.schema';
import { Provider } from '@nestjs/common/interfaces';
import { PersonRepository } from './repositories/person.repository';

const providers: Provider[] = [
  {
    provide: 'PERSON_REPOSITORY',
    useClass: PersonRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonEntity.name, schema: PersonSchema },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoService,
    }),
  ],
  providers,
  exports: providers,
})
export class MongoModule {}
