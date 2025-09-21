import { Queue } from 'bullmq';

const connection = {
  connection: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
  }
};

export type OmniQueues = {
  uploadQueue: Queue;
  publishQueue: Queue;
  commentQueue: Queue;
  metricsQueue: Queue;
};

export function createQueues(): OmniQueues {
  return {
    uploadQueue: new Queue('uploadQueue', connection),
    publishQueue: new Queue('publishQueue', connection),
    commentQueue: new Queue('commentQueue', connection),
    metricsQueue: new Queue('metricsQueue', connection)
  };
}
