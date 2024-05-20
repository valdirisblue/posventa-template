import { MongoRepository } from './mongo-abstract.repository';
import {
  PersonDocument,
  PersonEntity,
  PersonModel,
} from '../schemas/person.schema';
import { IPersonRepository } from '../../../../domain/interfaces/repositories/person.repository';
import { InjectModel } from '@nestjs/mongoose';

export class PersonRepository
  extends MongoRepository<PersonDocument>
  implements IPersonRepository
{
  constructor(
    @InjectModel(PersonEntity.name) private readonly personModel: PersonModel,
  ) {
    super(personModel);
  }
}
