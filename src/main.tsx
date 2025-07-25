import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConvexProviderWrapper } from "./lib/convexClient.tsx";

createRoot(document.getElementById("root")!).render(
  <ConvexProviderWrapper>
    <App />
  </ConvexProviderWrapper>
);
