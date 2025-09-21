import type { Job } from 'bullmq';
import { logger } from '../../services/logger';
import type { PostTarget } from '@omni/core/types/post';
import { assemblePostText } from '@omni/core/workflows/text-assembly';
import { YoutubePublisher } from '@omni/providers/youtube/youtube-provider';

export function createPublishProcessor() {
  return async (job: Job<{ target: PostTarget; payload: Parameters<typeof assemblePostText>[0] }>) => {
    const { target, payload } = job.data;
    const publisher = new YoutubePublisher('stub-token');
    const [assembled] = assemblePostText(payload);
    const result = await publisher.publish(target, { text: assembled.text });
    logger.info({ jobId: job.id, result }, 'Publish job completed');
    return result;
  };
}
