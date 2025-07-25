import { httpRouter } from "convex/server";
import { logInteraction, getLogs, markSuspicious } from "./logs";

const http = httpRouter();

export default {
  logInteraction,
  getLogs,
  markSuspicious,
};
