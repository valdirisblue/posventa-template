import { Module } from '@nestjs/common'
import { ConfigModule  } from '@nestjs/config'
import { enviroment } from './enviroments'
import configuration from './configuration'
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:enviroment[process.env.NODE_ENV] || enviroment.dev,
      load:[configuration]
    })
  ],
  exports:[],

})
export class ConfigModueEnv {}