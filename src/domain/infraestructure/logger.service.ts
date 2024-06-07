
interface LoggerJson {
  timestamp: string
  level: string;
  aplication_id: string 
  subdomain: string
  message: string;
  context?: object;
}

export interface ILoggerService {
  info(message: string, context?: object): void 
  debug(message: string, context?: object): void
  warn(message: string, context?: object): void 
  error(message: string, context?: object): void
  log(message: string, context?: object): void
  printLog<T = any>(description: string, message: T, isError?: boolean, extraContext?: object)
}