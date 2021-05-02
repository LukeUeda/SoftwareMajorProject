// import winston from 'winston';
//
// const format = winston.format;
// const alignedWithColorsAndTime = format.combine(
//   format.colorize(),
//   format.timestamp(),
//   format.align(),
//   format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
// );
//
// export const logger = winston.createLogger({
//   format: alignedWithColorsAndTime,
//   level: 'debug',
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({
//       filename: `composer-graph.log`,
//       colorize: false,
//       maxFiles: 5,
//       maxsize: 5242880, // 5MB
//       tailable: true
//     })
//   ]
// });
