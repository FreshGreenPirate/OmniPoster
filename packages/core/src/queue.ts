import type { Job, JobsOptions, Queue, QueueEvents } from 'bullmq';

export type JobType = 'UPLOAD' | 'PUBLISH' | 'FIRST_COMMENT' | 'METRICS_REFRESH';

export interface QueueDefinition<TData extends object = any> {
  name: string;
  type: JobType;
  queue: Queue<TData, any, JobType>;
  events: QueueEvents;
  defaultJobOptions?: JobsOptions;
}

export interface ScheduledJobPayload {
  type: JobType;
  targetId: string;
  runAt: Date;
  attempts?: number;
  backoff?: JobsOptions['backoff'];
}

export const DEFAULT_JOB_OPTIONS: JobsOptions = {
  removeOnComplete: true,
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
};

export interface JobLogger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export const logJobStatus = (logger: JobLogger, job: Job, status: 'started' | 'completed' | 'failed') => {
  const meta = { id: job.id, name: job.name, attemptsMade: job.attemptsMade, data: job.data };
  if (status === 'failed') {
    logger.error(`Job ${job.name} failed`, meta);
  } else {
    logger.info(`Job ${job.name} ${status}`, meta);
  }
};
