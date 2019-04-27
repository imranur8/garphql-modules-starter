import * as winston from "winston";

// Winston : A logger for just about everything.
// https://github.com/winstonjs/winston
// ADD custom transports https://github.com/winstonjs/winston#transports

// create winston logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "debug",
  transports: [],
});

// development Environment specific config
if (process.env.NODE_ENV === "development") {

  // add console transports in winston logger
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// production Environment specific config
if (process.env.NODE_ENV === "production") {
  // TODO:  add third party logging services like loggly, logentries etc..

}

export default logger;
