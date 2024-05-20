import { Test  } from '@nestjs/testing'
import { TokensServices } from './tokens.service'
import { BxHttpService } from '../http/http.service'
import { ConfigService  } from '@nestjs/config';

const valuesConfigService = {
  urlUniversalLogin:process.env.URL_UNIVERSAL_LOGIN,
  univesalLoginUserPass:{
    username:process.env.USERNAME_UL,
    password:process.env.PASSWORD_UL,
    client_id:process.env.CLIENT_ID,
    grant_type:process.env.GRANT_TYPE_UL
  },
  universalLoginClientC:{
    grant_type:'client_credentials',
    client_id:process.env.CLIENT_ID_CC,
    client_secret:process.env.CLIENT_SECRET,
  }

}

describe('universal login',()=>{

  let service:TokensServices;
  let bxHttpService:Partial<BxHttpService>
  let configService:Partial<ConfigService>

  const valueReturnedMakeRequest = {
    access_token:'yoursecretToken'
  }
  beforeEach(async()=>{

    bxHttpService = {
      makeRequest: jest.fn().mockReturnValue(valueReturnedMakeRequest)
    }

  
    const module = await Test.createTestingModule({
      
      providers:[
        TokensServices,
        {
          provide:BxHttpService,
          useValue:bxHttpService
        },
        {
          provide:ConfigService,
          useFactory:()=>{
            return {
              get:jest.fn().mockImplementation((key:string)=>{
                return  valuesConfigService[key]
              })
            }
          }
        }

      ]
    }).compile()

    service = module.get(TokensServices)
    
  })

  it('should expect ',async ()=>{
    
    const result = await service.tokenUniversalLogin()

    expect(result).toEqual({accessToken:valueReturnedMakeRequest.access_token})
  })

})