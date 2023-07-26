const winston = require("winston");
const { timestamp, label, combine, printf } = winston.format;
const logsFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} ${level} ${message}`;
});

const appLogger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  transports: [
    new winston.transports.File({
      filename: "../../logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "../../logs/debug.log",
      level: "debug",
    }),
  ],
  format: combine(label({ label: "User Management" }), timestamp(), logsFormat),
});

module.exports = { appLogger };
