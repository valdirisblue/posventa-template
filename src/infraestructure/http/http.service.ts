import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, of } from 'rxjs'
import { IparamsReq } from "@domain/interfaces";
import { IHttpService } from "@domain/infraestructure/http.service"
import { ILoggerService } from '@domain/infraestructure/logger.service'


@Injectable()
export class BxHttpService implements IHttpService {

  constructor(
    private readonly http: HttpService,
    @Inject('USE_LOGGER') private readonly logger: ILoggerService

  ) {}

  private get(params: IparamsReq) {
    const { url, headers = {} } = params
    return this.http.get(url,{headers})
  }
  private post(params: IparamsReq) {

    const { url, body, headers } = params
    return this.http.post(url, body,{ headers })
  }
  private patch(params:IparamsReq){
    const { url,body,headers} = params
    return this.http.patch(url,body,{ headers })

  }
  private selectMethod(params: IparamsReq) {
    const { method } = params
    const methods = {
      post: this.post(params),
      get: this.get(params),
      patch: this.patch(params)
    }
    return methods[method]
  }
  /**
   * 
   * @param params params.method default  method post
   * @returns 
   */
 
  public async makeRequest(params:IparamsReq) {
    params.method =  params.method ? params.method : 'post' 
    const { url, body, onErrorName } = params
    const response = await firstValueFrom(
      this.selectMethod(params).pipe(
        catchError((err) => {
          this.logger.error(onErrorName?onErrorName:'Error[makeRequest]',{error:err,url,body})
          return of(err.response)
        })
      )
    )
    return response.data
  }


}