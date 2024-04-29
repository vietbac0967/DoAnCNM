import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import winstonMongodb from "winston-mongodb";
const { combine, timestamp, printf, align, json } = winston.format;
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   dirname: "logs",
    //   filename: "data.log", // level 1
    // }),
    // logging in mongodb
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI,
      options: { useUnifiedTopology: true },
      collection: "logs",
      level: "error",
      format: combine(timestamp(), json()),
    }),
    // logging in file for current day
    new DailyRotateFile({
      dirname: "logs",
      filename: "application-%DATE%.info.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "1m",
      maxFiles: "14d",
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS A",
        }),
        align(), //
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
      level: "info",
    }),
    new DailyRotateFile({
      dirname: "logs",
      filename: "application-%DATE%.error.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS A",
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      level: "error",
    }),
  ],
});
export default logger;
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
