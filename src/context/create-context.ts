import { createContext as createContextOriginal } from "react";
import { createProvider } from "./create-provider";
import { ContextType } from "./context-types";

export function createContext<T>(defaultValue: T) {
  const context = createContextOriginal<ContextType<T>>({
    value: {
      current: defaultValue,
    },
    registerListener: () => {
      return () => false;
    },
    listeners: new Set(),
  });

  const Provider = createProvider(context.Provider);

  return { context, Provider };
}
