import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameResults = pgTable("game_results", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  theme: varchar("theme", { length: 20 }).notNull(), // 'reds', 'blues', etc.
  attempts: integer("attempts").notNull(),
  timeSeconds: integer("time_seconds").notNull(),
  score: integer("score").notNull(), // calculated score based on attempts and time
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameResultSchema = createInsertSchema(gameResults).pick({
  theme: true,
  attempts: true,
  timeSeconds: true,
  score: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameResult = typeof gameResults.$inferSelect;
export type InsertGameResult = z.infer<typeof insertGameResultSchema>;
