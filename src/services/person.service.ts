import  { IPerson } from '@domain/models/person.interface';
import  { IPersonService } from '@domain/services/person.service';

export class PersonService implements IPersonService {
  constructor(
  ) {}

  //TODO: esto deberia ser con DTO, que valide datos de entrada
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
