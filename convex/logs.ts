import { mutation, query } from "convex/server";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import type { DatabaseReader, DatabaseWriter } from "./_generated/server";

export const logInteraction = mutation({
  args: {
    ip: v.string(),
    endpoint: v.string(),
    userAgent: v.string(),
    timestamp: v.number(),
    geolocation: v.optional(v.string()),
    anomalyScore: v.optional(v.number()),
  },
  handler: async (ctx: { db: DatabaseWriter }, args) => {
    await ctx.db.insert("logs", {
      ...args,
      isSuspicious: false,
    });
  },
});

export const getLogs = query({
  args: {
    ip: v.optional(v.string()),
    endpoint: v.optional(v.string()),
    from: v.optional(v.number()),
    to: v.optional(v.number()),
  },
  handler: async (ctx: { db: DatabaseReader }, args) => {
    let logs = await ctx.db.query("logs").order("desc").collect();
    if (args.ip) logs = logs.filter((l: Doc<"logs">) => l.ip === args.ip);
    if (args.endpoint) logs = logs.filter((l: Doc<"logs">) => l.endpoint === args.endpoint);
    if (args.from) logs = logs.filter((l: Doc<"logs">) => l.timestamp >= args.from!);
    if (args.to) logs = logs.filter((l: Doc<"logs">) => l.timestamp <= args.to!);
    return logs;
  },
});

export const markSuspicious = mutation({
  args: { id: v.id("logs") },
  handler: async (ctx: { db: DatabaseWriter }, args) => {
    await ctx.db.patch(args.id, { isSuspicious: true });
  },
}); 