import { createLogger, format, transports, Logger, addColors } from 'winston';

const colors = {
    info: 'green',
    warn: 'yellow',
    error: 'red',
};

addColors(colors);

class CustomLogger {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }),
                format.json(),
            ),
            transports: [
                new transports.Console({
                    format: format.combine(format.json()),
                }),
            ],
        });
    }

    infoDirect(message: any, obj?: any) {
        this.logger.info(message, { message: JSON.stringify(obj) });
    }

    infoAttach(title: any, eventData: any) {
        this.logger.info(title, { context: eventData });
    }

    errorDirect(message: any, obj?: any) {
        this.logger.error(message, { message: JSON.stringify(obj) });
    }

    errorAttach(title: any, eventData: any) {
        this.logger.error(title, { context: eventData });
    }

    warn(message: any, context?: string) {
        this.logger.warn(message, { context });
    }
}

const customLog = new CustomLogger();

export default customLog;