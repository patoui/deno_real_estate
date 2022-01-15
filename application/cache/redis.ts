import { redisConnect } from '../../deps.ts';

export const redis = await redisConnect({
  hostname: 'deno_test_redis',
  port: 6379,
});