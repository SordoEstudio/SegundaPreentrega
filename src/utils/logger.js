import winston, { format } from "winston";
import 'dotenv/config'
const { combine, colorize, printf, timestamp } = format;

const logConfigDES = {
  level: "debug",
  format: combine(
    timestamp({
      format: "MM-DD-YY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
  ),
  transports: [new winston.transports.Console({ level: "debug" })],
};
const logConfigDEV = {
  level: "debug",
  format: combine(
    timestamp({
      format: "MM-DD-YY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "./logs/Error.log",
    }),
    new winston.transports.Console({
      level: "info"
    }),
  ],
};

const entorno = process.env.NODE_ENV === 'production' ? logConfigDEV : logConfigDES

export const logger = winston.createLogger(entorno);

/* logger.silly("This is a silly log.");
logger.debug("This is a debug log.");
logger.verbose("This is a verbose log.");
logger.info("This is an info log.");
logger.http("This is a http log.");
logger.warn("This is a warning log.");
logger.error("This is an error log."); */

