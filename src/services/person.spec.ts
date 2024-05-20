import { PersonService } from "./person.service";

describe("Person Service", () => {
  const personService = new PersonService();

  beforeEach(() => {});

  it("post person service", async() => {
    const result =  await personService.createPerson({
      name: "gian",
      surname: "valdiris",
      email: "g@maio.com",
    });

    
    expect(result).toEqual({
      status: "person createm",
    });
  });

  it("get person service",async ()=>{
    const result = await personService.getPeople()
  
    expect(result).toEqual({
      status:'ok persons getAll'
    })
  });
});
