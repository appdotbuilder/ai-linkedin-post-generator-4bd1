import { z } from 'zod';

// LinkedInPost schema for database records
export const linkedInPostSchema = z.object({
  id: z.number(),
  user_input: z.string(),
  generated_content: z.string(),
  post_type: z.enum(['professional', 'thought_leadership', 'personal', 'industry_news', 'general']),
  tone: z.enum(['formal', 'casual', 'inspirational', 'educational', 'conversational']),
  include_hashtags: z.boolean(),
  include_call_to_action: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type LinkedInPost = z.infer<typeof linkedInPostSchema>;

// Input schema for generating new LinkedIn posts
export const generatePostInputSchema = z.object({
  user_input: z.string().min(1, 'Input text is required'),
  post_type: z.enum(['professional', 'thought_leadership', 'personal', 'industry_news', 'general']).default('general'),
  tone: z.enum(['formal', 'casual', 'inspirational', 'educational', 'conversational']).default('conversational'),
  include_hashtags: z.boolean().default(true),
  include_call_to_action: z.boolean().default(false)
});

export type GeneratePostInput = z.infer<typeof generatePostInputSchema>;

// Response schema for generated posts
export const generatePostResponseSchema = z.object({
  id: z.number(),
  generated_content: z.string(),
  user_input: z.string(),
  post_type: z.enum(['professional', 'thought_leadership', 'personal', 'industry_news', 'general']),
  tone: z.enum(['formal', 'casual', 'inspirational', 'educational', 'conversational']),
  include_hashtags: z.boolean(),
  include_call_to_action: z.boolean(),
  created_at: z.coerce.date()
});

export type GeneratePostResponse = z.infer<typeof generatePostResponseSchema>;

// Schema for getting post history
export const getPostHistoryResponseSchema = z.array(linkedInPostSchema);

export type GetPostHistoryResponse = z.infer<typeof getPostHistoryResponseSchema>;

// Schema for getting a single post by ID
export const getPostByIdInputSchema = z.object({
  id: z.number()
});

export type GetPostByIdInput = z.infer<typeof getPostByIdInputSchema>;

// Schema for updating a post
export const updatePostInputSchema = z.object({
  id: z.number(),
  generated_content: z.string().optional(),
  post_type: z.enum(['professional', 'thought_leadership', 'personal', 'industry_news', 'general']).optional(),
  tone: z.enum(['formal', 'casual', 'inspirational', 'educational', 'conversational']).optional(),
  include_hashtags: z.boolean().optional(),
  include_call_to_action: z.boolean().optional()
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

// Schema for deleting a post
export const deletePostInputSchema = z.object({
  id: z.number()
});

export type DeletePostInput = z.infer<typeof deletePostInputSchema>;