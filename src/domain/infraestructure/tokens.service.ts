import  { IResponseToken, IResponseTokenSF } from "../interfaces";

 
export interface ITokensService{

  tokenUniversalLogin():Promise<IResponseToken>;
  tokenSalesforce():Promise<IResponseTokenSF>;
  tokenMkt():Promise<IResponseToken>;
}