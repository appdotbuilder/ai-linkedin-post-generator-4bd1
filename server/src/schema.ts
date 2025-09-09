import { z } from 'zod';

// LinkedIn post generation input schema
export const generatePostInputSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  keyPoints: z.array(z.string()).min(1, 'At least one key point is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  tone: z.enum(['professional', 'casual', 'enthusiastic', 'informative', 'motivational']).default('professional'),
  postLength: z.enum(['short', 'medium', 'long']).default('medium'),
});

export type GeneratePostInput = z.infer<typeof generatePostInputSchema>;

// Generated LinkedIn post schema
export const linkedinPostSchema = z.object({
  id: z.number(),
  topic: z.string(),
  keyPoints: z.array(z.string()),
  targetAudience: z.string(),
  tone: z.enum(['professional', 'casual', 'enthusiastic', 'informative', 'motivational']),
  postLength: z.enum(['short', 'medium', 'long']),
  generatedContent: z.string(),
  createdAt: z.coerce.date(),
});

export type LinkedinPost = z.infer<typeof linkedinPostSchema>;

// Input schema for saving generated posts
export const savePostInputSchema = z.object({
  topic: z.string(),
  keyPoints: z.array(z.string()),
  targetAudience: z.string(),
  tone: z.enum(['professional', 'casual', 'enthusiastic', 'informative', 'motivational']),
  postLength: z.enum(['short', 'medium', 'long']),
  generatedContent: z.string(),
});

export type SavePostInput = z.infer<typeof savePostInputSchema>;

// Schema for retrieving saved posts
export const getSavedPostsInputSchema = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
});

export type GetSavedPostsInput = z.infer<typeof getSavedPostsInputSchema>;

// Response schema for paginated posts
export const savedPostsResponseSchema = z.object({
  posts: z.array(linkedinPostSchema),
  total: z.number().int().nonnegative(),
  hasMore: z.boolean(),
});

export type SavedPostsResponse = z.infer<typeof savedPostsResponseSchema>;