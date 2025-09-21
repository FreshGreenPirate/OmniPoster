import type { Job } from 'bullmq';
import { logger } from '../../services/logger';
import type { PostTarget } from '@omni/core/types/post';
import { YoutubePublisher } from '@omni/providers/youtube/youtube-provider';

export function createMetricsProcessor() {
  return async (job: Job<PostTarget>) => {
    const publisher = new YoutubePublisher('stub-token');
    const metrics = await publisher.getMetrics(job.data);
    logger.info({ jobId: job.id, metrics }, 'Metrics refreshed');
    return metrics;
  };
}
