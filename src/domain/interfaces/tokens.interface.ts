


export interface IResponseToken{
  tokenType:string;
  accessToken:string;
}
export interface IResponseTokenSF extends IResponseToken{

  instanceUrl:string
}