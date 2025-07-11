
import { db } from '../db';
import { pageRequestsTable } from '../db/schema';
import { type PageRequest } from '../db/schema';

export const logPageRequest = async (ipAddress?: string, userAgent?: string): Promise<PageRequest> => {
  try {
    // Insert page request record
    const result = await db.insert(pageRequestsTable)
      .values({
        ip_address: ipAddress || null,
        user_agent: userAgent || null,
        // requested_at will be set by default (defaultNow())
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Page request logging failed:', error);
    throw error;
  }
};
