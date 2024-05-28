import { Module } from '@nestjs/common'
import { ConfigModule  } from '@nestjs/config'
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      load:[()=>({
          salesforce:{
            baseUrlToken:process.env.URL_TOKEN_SALESFORCE,
            url:process.env.URL_SALESFORCE,
            grantType:process.env.GRANT_TYPE_SALESFOCE,
            clientId:process.env.CLIENT_ID_SALESFOCE,
            clientSecret:process.env.CLIENT_SECRET_SALESFOCE,
            username:process.env.USERNAME_SALESFOCE,
            password:process.env.PASSWORD_SALESFOCE,
          },
          mkt:{
            urlToken:process.env.URL_MKT_TOKEN,
            url:process.env.URL_MKT,
            body:{
              grant_type: process.env.GRANT_TYPE_MKT,
              client_id: process.env.CLIENT_ID_MKT,
              client_secret: process.env.CLIENT_SECRET_MKT
            }
          },
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
          },
        })
      ]
    })
  ],
  exports:[],

})
export class ConfigModueEnv {}