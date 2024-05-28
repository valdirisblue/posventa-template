import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, of } from 'rxjs'
import { IparamsReq } from "@domain/interfaces/http.interface";
import { IHttpService } from "@domain/interfaces/services/http.service";
import customLog from "@common/utils/customLog";


@Injectable()
export class BxHttpService implements IHttpService {

  constructor(
    private readonly http: HttpService
  ) {}

  public get(params: IparamsReq) {
    const { url, headers = {} } = params
    return this.http.get(url,{headers})
  }
  public post(params: IparamsReq) {

    const { url, body, headers } = params
    return this.http.post(url, body,{ headers })
  }
  public patch(params:IparamsReq){
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
 
  async makeRequest(params:IparamsReq) {
    params.method =  params.method ? params.method : 'post' 
    const { url, body, onErrorName } = params
    const response = await firstValueFrom(
      this.selectMethod(params).pipe(
        catchError((err) => {
          customLog.errorAttach(onErrorName?onErrorName:'Error[makeRequest]',{error:err,url,body})
          return of(err.response)
        })
      )
    )
    return response.data
  }


}