import React, { useEffect, useRef } from "react";
import { ContextType, ListenerType, ProviderPropsType } from "./context-types";

export function createProvider<T>(
  ProviderOriginal: React.Provider<ContextType<T>>
) {
  return function Provider({ value, children }: ProviderPropsType<T>) {
    const valueRef = useRef(value);

    const listenersRef = useRef(new Set<ListenerType<T>>());

    const contextValue = useRef({
      value: valueRef,
      registerListener: (listener: ListenerType<T>) => {
        listenersRef.current.add(listener);
        return () => {
          listenersRef.current.delete(listener);
        };
      },
      listeners: new Set<ListenerType<T>>(),
    });

    useEffect(() => {
      valueRef.current = value;
      listenersRef.current.forEach((listener: ListenerType<T>) => {
        listener(value);
      });
    }, [value]);

    return (
      <ProviderOriginal value={contextValue.current}>
        {children}
      </ProviderOriginal>
    );
  };
}
