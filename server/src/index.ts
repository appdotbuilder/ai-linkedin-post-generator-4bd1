import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  generatePostInputSchema, 
  getPostByIdInputSchema, 
  updatePostInputSchema, 
  deletePostInputSchema 
} from './schema';

// Import handlers
import { generatePost } from './handlers/generate_post';
import { getPostHistory } from './handlers/get_post_history';
import { getPostById } from './handlers/get_post_by_id';
import { updatePost } from './handlers/update_post';
import { deletePost } from './handlers/delete_post';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Generate a new LinkedIn post using AI
  generatePost: publicProcedure
    .input(generatePostInputSchema)
    .mutation(({ input }) => generatePost(input)),

  // Get all LinkedIn posts history
  getPostHistory: publicProcedure
    .query(() => getPostHistory()),

  // Get a specific LinkedIn post by ID
  getPostById: publicProcedure
    .input(getPostByIdInputSchema)
    .query(({ input }) => getPostById(input)),

  // Update an existing LinkedIn post
  updatePost: publicProcedure
    .input(updatePostInputSchema)
    .mutation(({ input }) => updatePost(input)),

  // Delete a LinkedIn post
  deletePost: publicProcedure
    .input(deletePostInputSchema)
    .mutation(({ input }) => deletePost(input)),
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
  console.log('Available endpoints:');
  console.log('- POST /generatePost - Generate new LinkedIn post');
  console.log('- GET /getPostHistory - Get all posts history');
  console.log('- GET /getPostById - Get specific post by ID');
  console.log('- POST /updatePost - Update existing post');
  console.log('- POST /deletePost - Delete a post');
}

start();