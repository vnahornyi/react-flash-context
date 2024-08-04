# react-flash-context

A lightweight React hook for optimizing context consumption by preventing unnecessary rerenders. Built purely with React, it enhances performance by selectively subscribing to context values.

## Features

- **Optimized Context Consumption**: Prevents unnecessary rerenders by selectively subscribing to context values.
- **Lightweight**: Built purely with React, ensuring minimal overhead.
- **Flexible**: Supports React 18 and can be easily integrated into any React project.

## Installation

```sh
npm install react-flash-context
```

## Usage

### Creating a Context

First, create a context using the `createContext` function:

```tsx
import { createContext } from "react-flash-context";

type ContextType = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

const { context, Provider } = createContext<ContextType>({} as ContextType);
```

Create class component Provider

```tsx
type ContextType = {
  value: number;
  increment: InstanceType<typeof CountProvider>["increment"];
  decrement: InstanceType<typeof CountProvider>["decrement"];
};

export class CountProvider extends React.Component<
  { children: React.ReactNode },
  ContextType
> {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      increment: this.increment,
      decrement: this.decrement,
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      ...prevState,
      value: prevState.value + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      ...prevState,
      value: prevState.value - 1,
    }));
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
```

You can also use function component Provider

```tsx
type StateType = {
  value: number;
};

type ContextType = StateType & {
  increment: () => void;
  decrement: () => void;
};

export const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    value: 0,
  });

  const contextState: ContextType = {
    ...state,
    increment: () => {
      setState((prevState) => ({
        value: prevState.value + 1,
      }));
    },
    decrement: () => {
      setState((prevState) => ({
        value: prevState.value - 1,
      }));
    },
  };

  return <Provider value={contextState}>{children}</Provider>;
};
```

### Using the Context Provider

Wrap your application or component tree with the `Provider`:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { CountProvider } from "./path-to-your-provider";

const App = () => (
  <CountProvider>
    <YourComponent />
  </CountProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

### Consuming the Context with `useContextSelector`

Use the `useContextSelector` hook to selectively consume context values:

```tsx
import React from "react";
import { useContextSelector } from "react-flash-context";
import { context } from "./path-to-your-context-file";

const YourComponent = () => {
  const value = useContextSelector(context, (state) => state.value);
  const increment = useContextSelector(context, (state) => state.increment);
  const decrement = useContextSelector(context, (state) => state.decrement);

  return (
    <div>
      <strong>{value}</strong>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

## API

### `createContext<T>(defaultValue: T)`

Creates a context with a default value.

- **`defaultValue`**: The initial value of the context.

Returns an object containing the context and the Provider component.

### `useContextSelector<T, R>(context: React.Context<ContextType<T>>, selector: (state: T) => R)`

A hook to selectively consume context values.

- **`context`**: The context to consume.
- **`selector`**: A function that selects a part of the context state.

Returns the selected value from the context.

### Dependencies

- **React**: *
- **ReactDOM**: *

## License

ISC
