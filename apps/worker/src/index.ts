import { Worker, QueueEvents, Queue } from 'bullmq';
import IORedis from 'ioredis';
import pino from 'pino';
import { DEFAULT_JOB_OPTIONS, JobType, logJobStatus } from '@omniposter/core';
import { createUploadProcessor } from './processors/upload';
import { createPublishProcessor } from './processors/publish';
import { createFirstCommentProcessor } from './processors/first-comment';
import { createMetricsProcessor } from './processors/metrics';

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379');
const logger = pino({ name: 'omniposter-worker' });

const queues: Record<JobType, { worker: Worker; events: QueueEvents; queue: Queue }> = {
  UPLOAD: createQueue('uploadQueue', createUploadProcessor, connection),
  PUBLISH: createQueue('publishQueue', createPublishProcessor, connection),
  FIRST_COMMENT: createQueue('commentQueue', createFirstCommentProcessor, connection),
  METRICS_REFRESH: createQueue('metricsQueue', createMetricsProcessor, connection),
};

function createQueue(
  name: string,
  processorFactory: (connection: IORedis) => (job: any) => Promise<void>,
  connection: IORedis
) {
  const worker = new Worker(name, processorFactory(connection), {
    connection,
    concurrency: 5,
  });
  const events = new QueueEvents(name, { connection });
  const queue = new Queue(name, { connection, defaultJobOptions: DEFAULT_JOB_OPTIONS });
  worker.on('completed', (job) => logJobStatus(logger, job, 'completed'));
  worker.on('failed', (job) => job && logJobStatus(logger, job, 'failed'));
  worker.on('active', (job) => logJobStatus(logger, job, 'started'));
  return { worker, events, queue };
}

logger.info('Worker booted', { queues: Object.keys(queues) });
