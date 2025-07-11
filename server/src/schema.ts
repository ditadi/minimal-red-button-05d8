
import { z } from 'zod';

// Simple health check response schema
export const healthCheckSchema = z.object({
  status: z.string(),
  timestamp: z.string()
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;
