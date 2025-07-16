import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlacedShape } from '../data/ShapeTypes';
import { useTitle } from './TitleContext';
import { dummyCurrentUser } from '../data/UserTypes';
import axios from 'axios';

interface ListContextType {
  shapesList: PlacedShape[];
  setShapesList: React.Dispatch<React.SetStateAction<PlacedShape[]>>;
  exportPainting: () => void;
  savePainting: () => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};

export const ListProvider = ({ children }: { children: ReactNode}) => {
  const [shapesList, setShapesList] = useState<PlacedShape[]>([]);
  const { paintingTitle } = useTitle();

  const exportPainting = () => {
    const paintingData = {
      timestamp: new Date().toISOString(),
      shapes: shapesList,
      title: paintingTitle,
    };
    
    const jsonString = JSON.stringify(paintingData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `painting-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const savePainting = () => {
    if (!dummyCurrentUser.username || dummyCurrentUser.username === "0") {
      alert("User not logged in.");
      return;
    }

    const paintingData = {
      username: dummyCurrentUser.username,
      jsonData: JSON.stringify({
        shapes: shapesList,
        title: paintingTitle,
      }),
    };

    axios
      .post("http://localhost:8080/api/paintings/save", paintingData)
      .then(() => {
        alert("Painting saved successfully!");
      })
      .catch(() => {
        alert("Failed to save painting.");
      });
  };

  return (
    <ListContext.Provider value={{ shapesList, setShapesList, exportPainting, savePainting }}>
      {children}
    </ListContext.Provider>
  );
};