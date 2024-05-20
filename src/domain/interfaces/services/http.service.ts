import { IparamsReq } from '../http.interface'
export interface IHttpService{
  makeRequest<T>(params:IparamsReq):Promise<T | any>
}