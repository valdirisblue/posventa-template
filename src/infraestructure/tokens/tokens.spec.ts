import { TokensServices } from './tokens.service'
import { BxHttpService } from  '../http/http.service'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Token Service Test',()=>{
  let service: Partial<TokensServices>
  let bxHttpService: Partial<BxHttpService>
  let configService :Partial<ConfigService>

  beforeAll(async()=>{
    const mod = await Test.createTestingModule({
      providers:[
        TokensServices,
        {
          provide:'USE_HTTP',
          useValue:{
            makeRequest:jest.fn()
          }
        },{
          provide:ConfigService,
          useValue:{
            get:jest.fn()
          }
        }
      ]
    }).compile()

    service =  mod.get(TokensServices)
    bxHttpService = mod.get('USE_HTTP')
    configService = mod.get(ConfigService)
  })

  
  it('verify defined services',()=>{
    expect(service).toBeDefined()
    expect(bxHttpService).toBeDefined()
    expect(configService).toBeDefined()
  })

  it('Test getTokenUL',async()=>{
    (bxHttpService.makeRequest as jest.Mock).mockClear()
    const dataReturnHttp = {
      access_token:'access_token_1',
    };
    (bxHttpService.makeRequest as jest.Mock).mockReturnValue(dataReturnHttp)

    const infoTokenUL =  await service.tokenUniversalLogin()
    expect(infoTokenUL).toEqual({ accessToken: 'access_token_1', tokenType: 'userPass' })
  })

  it('Test  getToken second call',async()=>{
    (bxHttpService.makeRequest as jest.Mock).mockClear()
    const dataReturnHttp2 = { access_token:'access_token_2' };
    (bxHttpService.makeRequest as jest.Mock).mockReturnValue(dataReturnHttp2)
    const infoTokenUL =  await service.tokenUniversalLogin()
    expect(infoTokenUL).toEqual({ accessToken: 'access_token_1', tokenType: 'userPass' })
    expect(bxHttpService.makeRequest).not.toHaveBeenCalled()
  })

  it('Test getToken Salesforce',async()=>{
    const dataResponse = {
      access_token:'access_token_sf_1',
      instance_url:'url',
      id:'123',
      token_type:'bearer',
      issued_at:'2023',
      signature:'sf',
      expiredIn:1000,
    };
    // mocker el makeRequest
    (configService.get as jest.Mock).mockReturnValue({});
    (bxHttpService.makeRequest as jest.Mock).mockReturnValue(dataResponse)
    const infoTokenSf = await service.tokenSalesforce();
    expect(infoTokenSf).toEqual({
      accessToken:dataResponse.access_token,
      tokenType:dataResponse.token_type,
      instanceUrl:dataResponse.instance_url
    });
    expect(bxHttpService.makeRequest).toHaveBeenCalled()
  })
  it('Test 2 getToken Salesforce',async()=>{
    (bxHttpService.makeRequest as jest.Mock).mockClear()
    const dataResponse = {
      access_token:'access_token_sf_2',
      instance_url:'url',
      id:'123',
      token_type:'bearer',
      issued_at:'2023',
      signature:'sf',
      expiredIn:1000,
    };
    // mocker el makeRequest
    (configService.get as jest.Mock).mockReturnValue({});
    (bxHttpService.makeRequest as jest.Mock).mockReturnValue(dataResponse)
    const infoTokenSf = await service.tokenSalesforce();
    expect(infoTokenSf).toEqual({
      accessToken:'access_token_sf_1',
      tokenType:dataResponse.token_type,
      instanceUrl:dataResponse.instance_url
    });
    expect(bxHttpService.makeRequest).not.toHaveBeenCalled()

  })

})