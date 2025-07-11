
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';
import { healthCheckSchema, staticPageSchema } from './schema';
import { getStaticPage } from './handlers/get_static_page';
import { logPageRequest } from './handlers/log_page_request';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure
    .output(healthCheckSchema)
    .query(() => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    }),
  
  getStaticPage: publicProcedure
    .output(staticPageSchema)
    .query(() => getStaticPage()),
  
  logPageRequest: publicProcedure
    .input(z.object({
      ipAddress: z.string().optional(),
      userAgent: z.string().optional()
    }))
    .mutation(({ input }) => logPageRequest(input.ipAddress, input.userAgent)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
