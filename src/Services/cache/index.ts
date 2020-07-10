import { default as Redis } from "ioredis";

// Redis Server
export const redis = new Redis(process.env.REDIS_URL as string, {
  connectTimeout: 200000,
});

export const subRedis = new Redis(process.env.REDIS_URL as string, {
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});

export const pubRedis = new Redis(process.env.REDIS_URL as string, {
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});
