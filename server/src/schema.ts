
import { z } from 'zod';

// Simple health check response schema
export const healthCheckSchema = z.object({
  status: z.string(),
  timestamp: z.string()
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;

// Static page response schema
export const staticPageSchema = z.object({
  html: z.string(),
  contentType: z.string()
});

export type StaticPage = z.infer<typeof staticPageSchema>;
