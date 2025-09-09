import { serial, text, pgTable, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

// Define enums for post type and tone
export const postTypeEnum = pgEnum('post_type', [
  'professional', 
  'thought_leadership', 
  'personal', 
  'industry_news', 
  'general'
]);

export const toneEnum = pgEnum('tone', [
  'formal', 
  'casual', 
  'inspirational', 
  'educational', 
  'conversational'
]);

// LinkedIn posts table
export const linkedInPostsTable = pgTable('linkedin_posts', {
  id: serial('id').primaryKey(),
  user_input: text('user_input').notNull(),
  generated_content: text('generated_content').notNull(),
  post_type: postTypeEnum('post_type').notNull().default('general'),
  tone: toneEnum('tone').notNull().default('conversational'),
  include_hashtags: boolean('include_hashtags').notNull().default(true),
  include_call_to_action: boolean('include_call_to_action').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type LinkedInPost = typeof linkedInPostsTable.$inferSelect; // For SELECT operations
export type NewLinkedInPost = typeof linkedInPostsTable.$inferInsert; // For INSERT operations

// Export all tables and relations for proper query building
export const tables = { 
  linkedInPosts: linkedInPostsTable 
};