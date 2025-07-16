import { createContext, useContext, useState, ReactNode } from "react";
import { ShapeType } from '../data/ShapeTypes';

interface Count {
  circle: number;
  square: number;
  triangle: number;
}

interface CountContextType {
  counts: Count;
  increment: (type: ShapeType) => void;
  decrement: (type: ShapeType) => void;
  resetCounts: () => void;
}

const CountContext = createContext<CountContextType | null>(null);

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useShapeCount must be used within ShapeCountProvider");
  }
  return context;
};

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<Count>({
    circle: 0,
    square: 0,
    triangle: 0,
  });

  const increment = (type: ShapeType) => {
    if (type !== null) {
        setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const decrement = (type: ShapeType) => {
    if (type !== null) {
        setCounts(prev => ({
        ...prev,
        [type]: Math.max(prev[type] - 1, 0),
        }));
    }
  };

  const resetCounts = () => {
    setCounts({
      circle: 0,
      square: 0,
      triangle: 0,
    });
  };  

  return (
    <CountContext.Provider value={{ counts, increment, decrement, resetCounts }}>
      {children}
    </CountContext.Provider>
  );
};
