import { createContext, useContext, useState, ReactNode } from 'react';

interface TitleContextType {
  paintingTitle: string;
  setPaintingTitle: (title: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('usePainting must be used within a PaintingProvider');
  }
  return context;
};

export const TitleProvider = ({ children }: { children: ReactNode}) => {
  const [paintingTitle, setPaintingTitle] = useState<string>('Painting Title');

  return (
    <TitleContext.Provider value={{ paintingTitle, setPaintingTitle }}>
      {children}
    </TitleContext.Provider>
  );
};