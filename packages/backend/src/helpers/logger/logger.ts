import { createLogger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { env } from '@/config';

import { devFormat, prodFormat } from './formats';

const { NODE_ENV } = env;

const isDev = NODE_ENV === 'development';

export const logger = createLogger({
  // Minimum level of active logs
  level: isDev ? 'debug' : 'info',

  transports: [
    new transports.Console({
      format: isDev ? devFormat : prodFormat,
    }),

    // File: all log info, daily rotation
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY_MM_DD_HH_mm_ss',
      maxFiles: '14d', // Logs saved for 14 days
      maxSize: '20m', // maximum 20MB per file
      format: prodFormat, // Always JSON in a file
      level: 'info',
    }),

    // Separate file for errors only
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY_MM_DD_HH_mm_ss',
      maxFiles: '30d', // Errors saved for 30 days
      format: prodFormat,
      level: 'error',
    }),
  ],

  // It catches Winston's own internal mistakes
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/exceptions.log',
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: 'logs/rejections.log',
    }),
  ],
});
