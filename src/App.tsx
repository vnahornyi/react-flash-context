import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CountContext, CounterProvider } from "./counter/counter.provider";
import { useContextSelector } from "./context/use-context-selector";

function Component1() {
  const count1 = useContextSelector(CountContext, (state) => state.count1);
  const incrementCount1 = useContextSelector(
    CountContext,
    (state) => state.incrementCount1
  );

  console.log("rerender1");

  return (
    <div>
      count 1: {count1}
      <button onClick={incrementCount1}>increment count 1</button>
    </div>
  );
}

function Component2() {
  const count2 = useContextSelector(CountContext, (state) => state.count2);
  const incrementCount2 = useContextSelector(
    CountContext,
    (state) => state.incrementCount2
  );

  console.log("rerender2");

  return (
    <div>
      count 2: {count2}
      <button onClick={incrementCount2}>increment count 1</button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Component1 />
        <Component2 />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </CounterProvider>
  );
}

export default App;
