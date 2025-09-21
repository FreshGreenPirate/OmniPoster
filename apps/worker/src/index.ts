import 'dotenv/config';
import { createQueues } from './queues/factory';
import { registerWorkers } from './workers/register';
import { logger } from './services/logger';

async function main() {
  const queues = createQueues();
  await registerWorkers(queues);
  logger.info('Worker bootstrapped');
}

main().catch((error) => {
  logger.error({ error }, 'Worker failed to start');
  process.exit(1);
});
