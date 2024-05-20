import { IPerson } from '../domain/model/person.interface';
import { IPersonService } from '../domain/interfaces/services/person.service';



export class PersonService implements IPersonService {
  constructor(
  ) {}

  async createPerson(person: IPerson) {
    return {
      status:200,
      message:'persona creada de forma correcta'
    }
  }

  async getPeople() {
    const people:IPerson = 
      {
        name:'blue person',
        email:'bluex@blue.cl',
        surname:'bluex'
      }
    return [people];
  }
}
