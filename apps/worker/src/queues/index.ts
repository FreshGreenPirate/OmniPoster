import { Queue, Worker, QueueScheduler } from "bullmq";
import IORedis from "ioredis";
import pino from "pino";
import { processUploadJob } from "../jobs/upload";
import { processPublishJob } from "../jobs/publish";
import { processFirstCommentJob } from "../jobs/first-comment";
import { processMetricsJob } from "../jobs/metrics";

const logger = pino({ name: "omniposter-worker" });

const redisConnection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379");

const queues = {
  uploadQueue: new Queue("uploadQueue", { connection: redisConnection }),
  publishQueue: new Queue("publishQueue", { connection: redisConnection }),
  commentQueue: new Queue("commentQueue", { connection: redisConnection }),
  metricsQueue: new Queue("metricsQueue", { connection: redisConnection }),
};

const schedulers = Object.entries(queues).map(([name, queue]) => {
  const scheduler = new QueueScheduler(queue.name, {
    connection: redisConnection,
  });
  scheduler.on("failed", (job, err) => {
    logger.error({ queue: name, jobId: job?.id, err }, "Queue scheduler failure");
  });
  return scheduler;
});

export async function initQueues() {
  logger.info("Starting OmniPoster worker queues");

  new Worker(queues.uploadQueue.name, processUploadJob, {
    connection: redisConnection,
  });

  new Worker(queues.publishQueue.name, processPublishJob, {
    connection: redisConnection,
  });

  new Worker(queues.commentQueue.name, processFirstCommentJob, {
    connection: redisConnection,
  });

  new Worker(queues.metricsQueue.name, processMetricsJob, {
    connection: redisConnection,
  });

  await Promise.all(schedulers.map((scheduler) => scheduler.waitUntilReady()));

  logger.info("Workers ready");
}

export type QueueNames = keyof typeof queues;

export function getQueue(name: QueueNames) {
  return queues[name];
}
