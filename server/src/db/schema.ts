import { serial, text, pgTable, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums for post tone and length
export const toneEnum = pgEnum('tone', ['professional', 'casual', 'enthusiastic', 'informative', 'motivational']);
export const postLengthEnum = pgEnum('post_length', ['short', 'medium', 'long']);

// LinkedIn posts table
export const linkedinPostsTable = pgTable('linkedin_posts', {
  id: serial('id').primaryKey(),
  topic: text('topic').notNull(),
  keyPoints: jsonb('key_points').notNull(), // Store array of strings as JSON
  targetAudience: text('target_audience').notNull(),
  tone: toneEnum('tone').notNull(),
  postLength: postLengthEnum('post_length').notNull(),
  generatedContent: text('generated_content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type LinkedinPost = typeof linkedinPostsTable.$inferSelect; // For SELECT operations
export type NewLinkedinPost = typeof linkedinPostsTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { 
  linkedinPosts: linkedinPostsTable 
};