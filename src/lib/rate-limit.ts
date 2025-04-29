import { LRUCache } from 'lru-cache';

export interface RateLimitOptions {
  interval: number;
  uniqueTokenPerInterval: number;
}

export interface RateLimitResult {
  success: boolean;
  reset: number;
}

export function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000
  });

  return {
    check: async (request: Request): Promise<RateLimitResult> => {
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      
      const tokenCount = (tokenCache.get(ip) as number[]) || [0];
      
      if (tokenCount[0] === 0) {
        tokenCache.set(ip, [1]);
        return {
          success: true,
          reset: Date.now() + options.interval
        };
      }

      if (tokenCount[0] >= options.uniqueTokenPerInterval) {
        const reset = Date.now() + options.interval;
        return {
          success: false,
          reset
        };
      }

      tokenCount[0]++;
      tokenCache.set(ip, tokenCount);

      return {
        success: true,
        reset: Date.now() + options.interval
      };
    }
  };
} 