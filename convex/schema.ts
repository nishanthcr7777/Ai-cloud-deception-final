import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  logs: {
    ip: "string",
    endpoint: "string",
    userAgent: "string",
    timestamp: "number", // Unix epoch ms
    geolocation: { type: "string", optional: true },
    anomalyScore: { type: "number", optional: true },
    isSuspicious: { type: "boolean", default: false },
  },
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
