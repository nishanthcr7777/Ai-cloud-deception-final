import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { MarkSuspiciousButton } from "./MarkSuspiciousButton";

export function AdminLogs() {
  const logs = useQuery(api.logs.getLogs, {});

  if (!logs) return <div>Loading...</div>;

  return (
    <div>
      <h2>Interaction Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id} style={{ marginBottom: 8 }}>
            <b>{new Date(log.timestamp).toLocaleString()}</b>: {log.ip} - {log.endpoint} - Suspicious: {log.isSuspicious ? "Yes" : "No"}
            <MarkSuspiciousButton logId={log._id} />
          </li>
        ))}
      </ul>
    </div>
  );
} 