import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function LogInteractionButton() {
  const logInteraction = useMutation(api.logs.logInteraction);

  const handleClick = async () => {
    await logInteraction({
      ip: "192.168.1.1",
      endpoint: "/fake-login",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      geolocation: "USA, CA",
      anomalyScore: 0.8,
    });
    alert("Interaction logged!");
  };

  return <button onClick={handleClick}>Log Fake Interaction</button>;
} 