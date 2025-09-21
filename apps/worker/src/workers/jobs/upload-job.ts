import type { Job } from 'bullmq';
import { logger } from '../../services/logger';
import type { PostTarget } from '@omni/core/types/post';
import { YoutubePublisher } from '@omni/providers/youtube/youtube-provider';

export function createUploadProcessor() {
  return async (job: Job<PostTarget>) => {
    logger.info({ jobId: job.id }, 'Starting upload job');
    const target = job.data;
    const publisher = new YoutubePublisher('stub-token');
    const session = await publisher.initUpload(target);
    logger.info({ sessionId: session.sessionId }, 'Upload session created');
    return session;
  };
}
