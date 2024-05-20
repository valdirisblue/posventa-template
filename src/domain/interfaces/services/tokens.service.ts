import  { IResponseToken, IResponseTokenSF } from "../tokens.interface";

 
export interface ITokensService{

  tokenUniversalLogin():Promise<IResponseToken>;
  tokenSalesforce():Promise<IResponseTokenSF>;
  tokenMkt():Promise<IResponseToken>;
}