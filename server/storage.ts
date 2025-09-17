import { type User, type InsertUser, type GameResult, type InsertGameResult, users, gameResults } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game statistics methods
  saveGameResult(result: InsertGameResult): Promise<GameResult>;
  getGameStats(): Promise<{
    totalGames: number;
    bestScoreByTheme: Record<string, { score: number; attempts: number; timeSeconds: number }>;
    recentGames: GameResult[];
    averageAttempts: number;
  }>;
}

// javascript_database integration - replacing MemStorage with DatabaseStorage

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async saveGameResult(result: InsertGameResult): Promise<GameResult> {
    const [gameResult] = await db
      .insert(gameResults)
      .values(result)
      .returning();
    return gameResult;
  }

  async getGameStats(): Promise<{
    totalGames: number;
    bestScoreByTheme: Record<string, { score: number; attempts: number; timeSeconds: number }>;
    recentGames: GameResult[];
    averageAttempts: number;
  }> {
    // Get total games
    const totalGames = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(gameResults)
      .then(rows => rows[0]?.count || 0);

    // Get best games by theme - simplified approach: get all games grouped by theme
    const allResults = await db
      .select()
      .from(gameResults)
      .orderBy(desc(gameResults.score), gameResults.attempts, gameResults.timeSeconds);

    const bestScoreByTheme: Record<string, { score: number; attempts: number; timeSeconds: number }> = {};
    for (const game of allResults) {
      if (!bestScoreByTheme[game.theme]) {
        // First game for this theme is the best (due to ordering)
        bestScoreByTheme[game.theme] = {
          score: game.score,
          attempts: game.attempts,
          timeSeconds: game.timeSeconds,
        };
      }
    }

    // Get recent games (last 10)
    const recentGames = await db
      .select()
      .from(gameResults)
      .orderBy(desc(gameResults.completedAt))
      .limit(10);

    // Get average attempts
    const avgResult = await db
      .select({ avg: sql<number>`avg(${gameResults.attempts})`.mapWith(Number) })
      .from(gameResults);
    const averageAttempts = avgResult[0]?.avg || 0;

    return {
      totalGames,
      bestScoreByTheme,
      recentGames,
      averageAttempts,
    };
  }
}

export const storage = new DatabaseStorage();
