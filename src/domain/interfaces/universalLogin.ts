

export interface IUniversalLogin{
  type: 'clientCrendentials'|'userPass'|null,
  tokenType:string;
  accessToken:string|null
  expiredIn:number
}

export interface univesalLoginUserPass{
  username:string;
  password:string;
  client_id:string;
  grant_type:string;
}

export interface UniversaLoginClientC{
  client_secret:string;
  client_id:string
}

export interface IResponseUniversalLogin {
  access_token:        string;
  expires_in:          number;
  refresh_expires_in:  number;
  refresh_token:       string;
  token_type:          string;
  "not-before-policy": number;
  session_state:       string;
  scope:               string;
}

export interface IResponseMKTToken {
  access_token:      string;
  token_type:        string;
  expires_in:        number;
  scope:             string;
  soap_instance_url: string;
  rest_instance_url: string;
}


export interface TokenSalesforce {
  access_token: string;
  instance_url: string;
  id:           string;
  token_type:   string;
  issued_at:    string;
  signature:    string;
  expiredIn?: number 
}




