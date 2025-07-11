
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

// Simple log table for tracking page requests (minimal database requirement)
export const pageRequestsTable = pgTable('page_requests', {
  id: serial('id').primaryKey(),
  ip_address: text('ip_address'),
  user_agent: text('user_agent'),
  requested_at: timestamp('requested_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type PageRequest = typeof pageRequestsTable.$inferSelect;
export type NewPageRequest = typeof pageRequestsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { pageRequests: pageRequestsTable };
