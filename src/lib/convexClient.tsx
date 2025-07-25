import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { PropsWithChildren } from "react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
export const convex = new ConvexReactClient(convexUrl);

export const ConvexProviderWrapper = ({ children }: PropsWithChildren) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}; 