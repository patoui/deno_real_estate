import { redisConnect } from '../../deps.ts';

export const redis = await redisConnect({
  hostname: Deno.env.get("REDIS_HOST") ?? '0.0.0.0',
  port: Deno.env.get("REDIS_PORT") ?? 6379,
});