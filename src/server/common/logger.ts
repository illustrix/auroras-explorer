import os from 'node:os'
import { createLogger, format, transports } from 'winston'
import ConsoleTransport from 'winston-humanize-console-transport'
import 'winston-daily-rotate-file'
import path from 'node:path'
import process from 'node:process'

const { combine, timestamp } = format

export const logger = createLogger({
  level: 'debug',
  defaultMeta: { pid: process.pid, host: os.hostname() },
  format: combine(timestamp()),
  transports: [new ConsoleTransport()],
})

const rotateFile = new transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '14d',
  format: format.json(),
  createSymlink: true,
  dirname: path.join(process.cwd(), 'logs'),
  filename: `%DATE%.log`,
})

logger.add(rotateFile)
