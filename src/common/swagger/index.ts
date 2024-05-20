import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { APP_VERSION, SWAGGER_DESCRIPTION, SWAGGER_PREFIX, SWAGGER_TITLE } from '../constants';
import * as YAML from 'yaml'
import * as  fs from 'fs'
export function createSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .addSecurityRequirements('basic')
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(APP_VERSION)
    .setLicense('Blue Express', 'https://www.blue.cl')
    .addServer('https://devapigw.bluex.cl','Development Environment')
    .addServer('https://qaapigw.bluex.cl','QA - Environment')
    .addServer('https://apigw.bluex.cl','Production Environmen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const yamlFile = YAML.stringify(document);
  fs.writeFileSync('./oas/oas.yaml', yamlFile);
  
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}
