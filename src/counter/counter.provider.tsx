import { Component } from "react";
import { createContext } from "../context/create-context";

export type CountStateType = {
  count1: number;
  count2: number;
  incrementCount1: InstanceType<typeof CounterProvider>["incrementCount1"];
  incrementCount2: InstanceType<typeof CounterProvider>["incrementCount2"];
};
export type CountPropsType = {
  children: React.ReactNode;
};

export const { context: CountContext, Provider } =
  createContext<CountStateType>({} as CountStateType);

export class CounterProvider extends Component<CountPropsType, CountStateType> {
  constructor(props: CountPropsType) {
    super(props);

    this.state = {
      count1: 0,
      count2: 0,
      incrementCount1: this.incrementCount1,
      incrementCount2: this.incrementCount2,
    };
  }

  incrementCount1 = () => {
    this.setState({
      ...this.state,
      count1: this.state.count1 + 1,
    });
  };

  incrementCount2 = () => {
    this.setState({
      ...this.state,
      count2: this.state.count2 + 1,
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
