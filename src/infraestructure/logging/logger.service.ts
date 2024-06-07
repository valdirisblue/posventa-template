import type { ILoggerService } from '@domain/infraestructure/logger.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, Logger, transports, format } from 'winston';
import { APLICATION_ID,SUBDOMAIN } from '@common/constants'
/**
 * Clase que encapsula las propiedades de un log.
 */
class LoggerJson {
  timestamp: string = new Date().toISOString();
  level: string;
  aplication_id: string = APLICATION_ID
  subdomain: string = SUBDOMAIN 
  message: string;
  context?: object;

  constructor(props: Partial<LoggerJson>) {
    Object.assign(this, props);
  }
}

@Injectable()
export class LoggerService implements ILoggerService {
  private logger: Logger;
  private activeLogLevels: Set<string>;

  constructor(private readonly configService: ConfigService) {
    const logLevels = this.configService.get<string[]>('bxLogLevel') || ['INFO', 'ERROR'];
    this.activeLogLevels = new Set(logLevels.map(level => level.trim().toUpperCase()));

    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.combine(format.timestamp(), format.json(), format.errors({ stack: true }))
        })
      ]
    });
  }

  /**
   * Crea el cuerpo del log.
   * @param level - Nivel del log.
   * @param message - Mensaje del log.
   * @param context - Contexto adicional (opcional).
   * @returns - Objeto LoggerJson.
   */
  private logBody(level: string, message: string, context?: object): LoggerJson {
    const logEntry: LoggerJson = new LoggerJson({
      level,
      message,
      timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Santiago" }),
      ...context && { context },
    });
    return logEntry;
  }

  /**
   * Verifica si el nivel de log está activo.
   * @param level - Nivel del log.
   * @returns - Booleano que indica si el nivel está activo.
   */
  private isLogLevelActive(level: string): boolean {
    return this.activeLogLevels.has(level.toUpperCase());
  }

  /**
   * Método auxiliar para registrar mensajes de log.
   * @param level - Nivel del log.
   * @param message - Mensaje del log.
   * @param context - Contexto adicional (opcional).
   */
  private logMessage(level: string, message: string, context?: object): void {
    if (this.isLogLevelActive(level.toUpperCase())) {
      this.logger.log(level, this.logBody(level, message, context));
    }
  }

  /**
   * Loguea un mensaje a nivel de info , debug, warn, error.
   * @param message - Mensaje del log.
   * @param context - Contexto adicional (opcional).
   */
  public info(message: string, context?: object): void {
    this.logMessage('info', message, context);
  }

  public debug(message: string, context?: object): void {
    this.logMessage('debug', message, context);
  }

  public warn(message: string, context?: object): void {
    this.logMessage('warn', message, context);
  }

  public error(message: string, context?: object): void {
    this.logMessage('error', message, context);
  }

  public log(message: string, context?: object): void {
    this.logMessage('info', message, context);
  }

  /**
   * Imprime un log con descripción y mensaje.
   * @param description - Descripción del log.
   * @param message - Mensaje del log, que debe ser un objeto o una cadena.
   * @param isError - Indica si es un error (opcional).
   * @param extraContext - Contexto adicional (opcional).
   */
  public printLog<T>(description: string, message: T, isError?: boolean, extraContext?: object): void {
    const bodyAsString: string = typeof message === 'string' ? message : JSON.stringify(message);
    const level = isError ? 'error' : 'info';
    if (this.isLogLevelActive(isError ? 'ERROR' : 'INFO')) {
      this[level](`${description} : ${bodyAsString}`, (extraContext || message) as object);
    }
  }
}