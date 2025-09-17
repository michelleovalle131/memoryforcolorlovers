import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Game statistics routes
  app.post("/api/games", async (req, res) => {
    try {
      const validatedData = insertGameResultSchema.parse(req.body);
      const gameResult = await storage.saveGameResult(validatedData);
      res.json(gameResult);
    } catch (error) {
      console.error("Error saving game result:", error);
      res.status(400).json({ error: "Invalid game data" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getGameStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching game stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
