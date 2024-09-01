import { useEffect, useRef, useState, useContext } from "react";
import { ContextType } from "./context-types";

export function useContextSelector<T, R>(
  context: React.Context<ContextType<T>>,
  selector: (state: T) => R
) {
  const { value, registerListener } = useContext(context);
  const selectorRef = useRef(selector);
  const [selectedValue, setSelectedValue] = useState(() =>
    selector(value.current)
  );
  const _selectedValue = useRef(selectedValue);
  _selectedValue.current = selectedValue;

  useEffect(() => {
    selectorRef.current = selector;
  });

  useEffect(() => {
    const updateValueIfNeeded = (newValue: T) => {
      const newSelectedValue = selectorRef.current(newValue);
      if (_selectedValue.current !== newSelectedValue) {
        setSelectedValue(() => newSelectedValue);
      }
    };

    const unregisterListener = registerListener(updateValueIfNeeded);

    return unregisterListener;
  }, [registerListener, value]);

  return selectedValue;
}
