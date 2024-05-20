import { IPerson } from '../../model/person.interface';

export interface IPersonService {
  createPerson(person: IPerson): Promise<{status:number,message:string}>;
  getPeople(): Promise<IPerson[]>;
}
