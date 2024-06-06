import { IPerson } from '../models/person.interface';

export interface IPersonService {
  createPerson(person: IPerson): Promise<{status:number,message:string}>;
  getPeople(): Promise<IPerson[]>;
}
