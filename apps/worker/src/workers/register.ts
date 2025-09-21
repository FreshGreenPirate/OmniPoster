import { Worker } from 'bullmq';
import { logger } from '../services/logger';
import type { OmniQueues } from '../queues/factory';
import { createUploadProcessor } from './jobs/upload-job';
import { createPublishProcessor } from './jobs/publish-job';
import { createFirstCommentProcessor } from './jobs/first-comment-job';
import { createMetricsProcessor } from './jobs/metrics-job';

const connection = {
  connection: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
  }
};

export async function registerWorkers(queues: OmniQueues) {
  logger.info({ queues: Object.keys(queues) }, 'Registering workers');

  new Worker('uploadQueue', createUploadProcessor(), connection).on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Upload job failed');
  });

  new Worker('publishQueue', createPublishProcessor(), connection).on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Publish job failed');
  });

  new Worker('commentQueue', createFirstCommentProcessor(), connection).on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'First comment job failed');
  });

  new Worker('metricsQueue', createMetricsProcessor(), connection).on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Metrics job failed');
  });
}
