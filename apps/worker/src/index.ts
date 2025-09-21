import { initQueues } from "./queues";

async function bootstrap() {
  await initQueues();
}

bootstrap().catch((error) => {
  console.error("Worker bootstrap failed", error);
  process.exit(1);
});
