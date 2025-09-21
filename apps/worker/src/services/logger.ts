import pino from 'pino';

export const logger = pino({
  name: 'omniposter-worker',
  level: process.env.LOG_LEVEL ?? 'info'
});
