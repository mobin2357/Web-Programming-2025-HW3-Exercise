import React, { createContext, useContext, useState } from "react";
import { ShapeType } from '../data/ShapeTypes';

interface ShapeContextType {
  selectedShape: ShapeType;
  setSelectedShape: (shape: ShapeType) => void;
}

const ShapeContext = createContext<ShapeContextType | undefined>(undefined);

export const ShapeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeType>(null);

  return (
    <ShapeContext.Provider value={{ selectedShape, setSelectedShape }}>
      {children}
    </ShapeContext.Provider>
  );
};

export const useShape = () => {
  const context = useContext(ShapeContext);
  if (!context) {
    throw new Error("useShape must be used within a ShapeProvider");
  }
  return context;
};
