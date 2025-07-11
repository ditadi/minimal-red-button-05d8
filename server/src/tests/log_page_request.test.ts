
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { pageRequestsTable } from '../db/schema';
import { logPageRequest } from '../handlers/log_page_request';
import { eq } from 'drizzle-orm';

describe('logPageRequest', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should log page request with IP and user agent', async () => {
    const ipAddress = '192.168.1.1';
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    const result = await logPageRequest(ipAddress, userAgent);

    // Basic field validation
    expect(result.ip_address).toEqual(ipAddress);
    expect(result.user_agent).toEqual(userAgent);
    expect(result.id).toBeDefined();
    expect(result.requested_at).toBeInstanceOf(Date);
  });

  it('should log page request with null values when no parameters provided', async () => {
    const result = await logPageRequest();

    // Should handle null values gracefully
    expect(result.ip_address).toBeNull();
    expect(result.user_agent).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.requested_at).toBeInstanceOf(Date);
  });

  it('should save page request to database', async () => {
    const ipAddress = '10.0.0.1';
    const userAgent = 'Test Browser';

    const result = await logPageRequest(ipAddress, userAgent);

    // Query using proper drizzle syntax
    const pageRequests = await db.select()
      .from(pageRequestsTable)
      .where(eq(pageRequestsTable.id, result.id))
      .execute();

    expect(pageRequests).toHaveLength(1);
    expect(pageRequests[0].ip_address).toEqual(ipAddress);
    expect(pageRequests[0].user_agent).toEqual(userAgent);
    expect(pageRequests[0].requested_at).toBeInstanceOf(Date);
  });

  it('should handle partial data correctly', async () => {
    const ipAddress = '172.16.0.1';

    const result = await logPageRequest(ipAddress);

    expect(result.ip_address).toEqual(ipAddress);
    expect(result.user_agent).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.requested_at).toBeInstanceOf(Date);
  });
});
