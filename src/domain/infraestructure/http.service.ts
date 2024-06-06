
import { IparamsReq } from '../interfaces'
export interface IHttpService{
  makeRequest<T>(params:IparamsReq):Promise<T | any>;
} 