import type { Job } from 'bullmq';
import { logger } from '../../services/logger';
import type { PostTarget } from '@omni/core/types/post';
import { YoutubePublisher } from '@omni/providers/youtube/youtube-provider';

export function createFirstCommentProcessor() {
  return async (job: Job<{ target: PostTarget; body: string }>) => {
    const publisher = new YoutubePublisher('stub-token');
    await publisher.postFirstComment(job.data.target, job.data.body);
    logger.info({ jobId: job.id }, 'First comment posted');
  };
}
