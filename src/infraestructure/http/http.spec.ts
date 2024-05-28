import { BxHttpService } from "./http.service";
import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { of,firstValueFrom } from "rxjs";
import { IparamsReq } from "../../domain/interfaces/http.interface";

describe("HttpService", () => {

  let service: BxHttpService;
  let httpServiceMock: Partial<HttpService>;


  beforeAll(async()=>{
    const module:TestingModule = await Test.createTestingModule({
      providers:[
        BxHttpService,
        {
          provide:HttpService,
          useValue: {
            get:jest.fn(),
            post:jest.fn(),
            patch:jest.fn()
          }
        }
      ]
    }).compile();

    

    service = module.get<BxHttpService>(BxHttpService)
    httpServiceMock = module.get<HttpService>(HttpService)
  })


  it('Test method get',async()=>{
    //simular la data  que nos va a devolver el get de HttpService
    (httpServiceMock.get as jest.Mock).mockReturnValue({result:true})
    const params:IparamsReq = {
      method:'get',
      url:'https://www.sampleUrl.com',
    }
    const result =  service.get(params)
    expect(service).toBeDefined()
    expect(result).toEqual({result:true})
    expect(httpServiceMock.get).toHaveBeenCalled()
    expect(httpServiceMock.get).toHaveBeenCalledWith(params.url,{headers:{}})
  })

  it('Test method Post',async()=>{
    const dataReturnHttpPost = {
      message:{
        status:200,
        data:{
          name:'Blue express'
        }
      }

    };
    const params:IparamsReq = {
      method:'post',
      url:'https://www.bluex.cl',
      body:{
        name:'blue'
      },
      headers:{
        Authorization:'beaerer token'
      }
    };
    (httpServiceMock.post as jest.Mock).mockReturnValue(dataReturnHttpPost)
    const result = service.post(params)
    expect(httpServiceMock.post).toBeDefined()
    expect(httpServiceMock.post).toHaveBeenCalled()
    expect(httpServiceMock.post).toHaveBeenCalledWith(params.url,params.body,{headers:params.headers})
    expect(result).toEqual(dataReturnHttpPost)
  })
  it('Test method patch',async()=>{
    const dataReturnHttpPatch = {
      message:'sucessfull request'
    };
    const params:IparamsReq = {
      method:'post',
      url:'https://www.bluex.cl',
      body:'body',
      headers:{
        Authorization:'beaerer token'
      }
    };
    (httpServiceMock.patch as jest.Mock).mockReturnValue(dataReturnHttpPatch)

    const result = service.patch(params)
    expect(httpServiceMock.patch).toHaveBeenCalled()
    expect(httpServiceMock.patch).toHaveBeenCalledWith(params.url,params.body,{headers:params.headers})
    expect(result).toEqual(dataReturnHttpPatch)
  })

  it('Test function makeRequest',async()=>{
    const dataReturn = {
      data:{
        message:'sucessfull request'
      }
    };

    const params:IparamsReq = {
      method:'post',
      url:'https://www.bluex.cl',
      body:'body',
      headers:{
        Authorization:'beaerer token'
      }
    };
    
    (httpServiceMock.post as jest.Mock).mockReturnValue(of(dataReturn));

    
    const result = await service.makeRequest(params)

    expect(httpServiceMock.post).toHaveBeenCalledWith(params.url,params.body,{ headers:params.headers })
    expect(result).toEqual(dataReturn.data)
    expect(httpServiceMock.post).toBeDefined()    

  })

  afterAll(()=>{
    jest.clearAllMocks()
  })


});


