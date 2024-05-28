import { Controller, Inject, Post, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IPerson } from "@domain/model/person.interface";
import { IPersonService } from "@domain/interfaces/services/person.service";

@Controller("healt")
export class Healt {
  constructor(
    @Inject("PERSON_SERVICE")
    private readonly personService: IPersonService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Endpoint para saber si el servicio esta arriba" })
  @ApiResponse({ status: 200, description: "se creo la personas" })
  @ApiResponse({ status: 400, description: "el servicio no esta arriba" })
  async createPerson() {
    const params = {
      name: "blue express",
      surname: "bluex",
      email: "bluex@blue.cl",
    };
    return {
      createdPerson: await this.personService.createPerson(params),
    };
  }

  @Get()
  @ApiOperation({ summary: "Endpoint para validar el servicio en kubernetes " })
  @ApiResponse({ status: 200, description: "prueba persona exitosas" })
  @ApiResponse({ status: 400, description: "prueba no personas" })
  async getPeople(): Promise<{ result: IPerson[] }> {
    const people = await this.personService.getPeople();
    return { result: people };
  }

}
