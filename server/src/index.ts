import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  generatePostInputSchema, 
  savePostInputSchema, 
  getSavedPostsInputSchema 
} from './schema';

// Import handlers
import { generatePost } from './handlers/generate_post';
import { savePost } from './handlers/save_post';
import { getSavedPosts } from './handlers/get_saved_posts';
import { deletePost } from './handlers/delete_post';
import { getPostById } from './handlers/get_post_by_id';

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

  // Generate a LinkedIn post using AI
  generatePost: publicProcedure
    .input(generatePostInputSchema)
    .mutation(({ input }) => generatePost(input)),

  // Save a generated post to the database
  savePost: publicProcedure
    .input(savePostInputSchema)
    .mutation(({ input }) => savePost(input)),

  // Get saved posts with pagination
  getSavedPosts: publicProcedure
    .input(getSavedPostsInputSchema)
    .query(({ input }) => getSavedPosts(input)),

  // Get a specific post by ID
  getPostById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(({ input }) => getPostById(input)),

  // Delete a saved post
  deletePost: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(({ input }) => deletePost(input)),

  // Generate and save post in one operation
  generateAndSavePost: publicProcedure
    .input(generatePostInputSchema)
    .mutation(async ({ input }) => {
      const generated = await generatePost(input);
      const savedPost = await savePost({
        ...input,
        generatedContent: generated.generatedContent,
      });
      return savedPost;
    }),
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
  console.log(`LinkedIn Post Generator TRPC server listening at port: ${port}`);
}

start();