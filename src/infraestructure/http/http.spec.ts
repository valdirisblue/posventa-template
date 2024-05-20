import { BxHttpService } from "./http.service";
import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { of,firstValueFrom } from "rxjs";
import { Iparams } from "../../domain/interfaces/universalLogin";

describe("HttpService", () => {
  let service: BxHttpService;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn()
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BxHttpService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get(BxHttpService);
  });
  it("shoul return data from a sucessful request", async () => {
    const mockResponsePost = {
      data: {
        access_token: "exampleToken",
        expires_in: 1200,
        refresh_expires_in: 1000,
        refresh_token: "refreshExampleToken",
      },
    };

    (httpServiceMock.post as jest.Mock).mockImplementation(() =>
      of(mockResponsePost)
    );

    const params: Iparams = {
      method: "post",
      url: "https://www.sampleurl.com",
      body: {},
    };
    const result = await service.makeRequest(params);
    expect(result).toEqual(mockResponsePost.data);
  });


  it('should get response ',async()=>{

    const mockGetResponse = {
      data:{
        sucess:true,
        message:'hello world'
      }
    };
    (httpServiceMock.get as jest.Mock).mockImplementation(()=>of(mockGetResponse))
    const params:Iparams = {
      method:'get',
      url:'www.example.com',
      headers:{}
    }
    await service.makeRequest(params);

    expect(httpServiceMock.get).toHaveBeenCalled()
    expect(httpServiceMock.get).toHaveBeenCalledWith(params.url,{ headers:params.headers})
  })

  it('should post Response',async()=>{

    const mockPostResponse = {
      data:{
        status:200,
        message:'sucessful request'
      }
    };

    (httpServiceMock.post as jest.Mock).mockImplementation(()=>of(mockPostResponse))

    const response = await firstValueFrom(service.post({
      url:'http://www.example.com',
      body:{},
      method:'post'
    }).pipe())
    expect(response).toEqual(mockPostResponse)
  })


  it('should get  method response ',async()=>{

    const mockGetResponse = {
      data:{
        sucess:true,
        message:'hello world'
      }
    };

    (httpServiceMock.get as jest.Mock).mockImplementation(()=>of(mockGetResponse))
    const params:Iparams = {
      method:'get',
      url:'www.example.com',
      headers:{}
    }
    const result = await firstValueFrom(service.get(params).pipe());
    expect(httpServiceMock.get).toHaveBeenCalled()
    expect(result).toEqual(mockGetResponse)

  })

});


