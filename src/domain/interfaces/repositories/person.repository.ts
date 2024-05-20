import { IPerson } from '../../model/person.interface';
import { BaseRepository } from './base.repository';

export interface IPersonRepository extends BaseRepository<IPerson, string> {}
