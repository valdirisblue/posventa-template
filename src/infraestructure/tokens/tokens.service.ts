import { Inject, Injectable } from '@nestjs/common'
import { ConfigService  } from '@nestjs/config'
import {
  IUniversalLogin,
  IResponseUniversalLogin,
  TokenSalesforce,
  IResponseMKTToken
} from '@domain/interfaces/universalLogin'
import  { ITokensService } from "@domain/infraestructure/tokens.service"
import  { IHttpService } from '@domain/infraestructure/http.service'
import customLog from '@common/utils/customLog'

@Injectable()
export class TokensServices implements ITokensService{

  private universalLoginToken:IUniversalLogin = {
    type:null,
    expiredIn:0,
    accessToken:null,
    tokenType:''
  }
  private salesforceToken:TokenSalesforce = {
    access_token: "",
    instance_url: "",
    id:           "",
    token_type:   "",
    issued_at:    "",
    signature:    "",
    expiredIn:    0,
  }
  private mktToken:IResponseMKTToken = {
    access_token:     "",
    token_type:       "" ,
    expires_in:       0 ,
    scope:            "",
    soap_instance_url:"",
    rest_instance_url:""
  }
  public constructor(
      @Inject('USE_HTTP')
      private readonly  bxHttp:IHttpService,
      private readonly configService:ConfigService
  ){}

  private setInfoToken(newInfo:IResponseUniversalLogin){
    this.universalLoginToken.type = 'userPass'
    this.universalLoginToken.accessToken = newInfo.access_token
    this.universalLoginToken.tokenType = 'bearer'
    this.universalLoginToken.expiredIn =  new Date().getTime() + newInfo.expires_in*1000
  }
  private setInfotokenSalesforce(newInfo:TokenSalesforce){
    this.salesforceToken.access_token = newInfo.access_token
    this.salesforceToken.instance_url = newInfo.instance_url
    this.salesforceToken.id = newInfo.id
    this.salesforceToken.token_type = newInfo.token_type
    this.salesforceToken.issued_at = newInfo.issued_at
    this.salesforceToken.signature = newInfo.signature
    this.salesforceToken.expiredIn = new Date().getTime() + 100*1000 // le damos de duracion 5 min 
  }

  private setInfoTokenMKT(newInfo:IResponseMKTToken){
    this.mktToken.access_token = newInfo.access_token
    this.mktToken.expires_in = newInfo.expires_in,
    this.mktToken.rest_instance_url = newInfo.rest_instance_url,
    this.mktToken.scope = newInfo.scope,
    this.mktToken.soap_instance_url=newInfo.soap_instance_url,
    this.mktToken.token_type = newInfo.token_type
    this.mktToken.expires_in = new Date().getTime() + newInfo.expires_in*1000
  }


  async tokenUniversalLogin(){
    let  expiredToken = new Date().getTime() >= this.universalLoginToken.expiredIn
    if(!(this.universalLoginToken.accessToken && !expiredToken)){
      let result = await this.getTokenUserPass() || await this.getTokenClientCredentials();
      this.setInfoToken(result)
    }
    
    return  {
      accessToken: this.universalLoginToken.accessToken,
      tokenType:this.universalLoginToken.type
    }
  }

  async tokenSalesforce(){
    if(!(this.salesforceToken.access_token && new Date().getTime() < this.salesforceToken.expiredIn)){
      const  salesforce = this.configService.get('salesforce')
      let url = salesforce.baseUrlToken + '?'
      const queryParams = {
        grant_type:salesforce.grantType,
        client_id:salesforce.clientId,
        client_secret:salesforce.clientSecret,
        username:salesforce.username,
        password:salesforce.password
      }
      for(let key of Object.keys(queryParams)){
        url = url + `${key}=${queryParams[key]}&`
      }
      const infoToken = await this.bxHttp.makeRequest({
        method:'post',
        url
      })
      this.setInfotokenSalesforce(infoToken)
    }
    return {
      accessToken:this.salesforceToken.access_token,
      tokenType:this.salesforceToken.token_type,
      instanceUrl: this.salesforceToken.instance_url
    }
  
  }
  async tokenMkt(){
    if(!(this.mktToken.access_token  && new Date().getTime() <this.mktToken.expires_in)){
      const infoDataToken = await this.bxHttp.makeRequest({
        method:'post',
        url:this.configService.get('mkt.urlToken'),
        body:this.configService.get('mkt.body')
      })
      this.setInfoTokenMKT(infoDataToken)
    }
    return {
      accessToken:this.mktToken.access_token,
      tokenType:this.mktToken.token_type
    }
  } 

  private async getTokenClientCredentials(){
    try{
      const infoBody = this.configService.get('universalLoginClientC')
      const body = new  URLSearchParams(infoBody)
      const url = this.configService.get<string>('urlUniversalLogin')
      const result = await this.bxHttp.makeRequest({
        method:'post',
        url,
        body:body.toString(),
      })
      return result
    }
    catch(err){
      customLog.errorAttach('getTokenClientCredentials',{error:err})
      return null;
    }
    
  }
  private async getTokenUserPass():Promise<IResponseUniversalLogin>{
    try{
        const infoBody = this.configService.get('universalLoginClientC')
        const url = this.configService.get<string>('urlUniversalLogin')
        const body = new  URLSearchParams(infoBody)
        const result = await this.bxHttp.makeRequest({
          method:'post',
          url,
          body:body.toString()
        })
        return result
    }
    catch(err){
      customLog.errorAttach('getTokenUserPass',{ error:err})
      return null
    }
  }

}