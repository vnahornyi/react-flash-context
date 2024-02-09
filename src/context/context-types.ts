export type RegisterListenerType<T> = (listener: ListenerType<T>) => () => void;

export type ContextType<T> = {
  value: {
    current: T;
  };
  registerListener: RegisterListenerType<T>;
  listeners: Set<ListenerType<T>>;
};


export type ProviderPropsType<T> = {
  value: T;
  children: React.ReactNode;
};

export type ListenerType<T> = (value: T) => void;
