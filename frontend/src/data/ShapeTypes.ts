export type ShapeType = 'circle' | 'square' | 'triangle' | null;

export interface PlacedShape {
    id: number;
    type: ShapeType;
    x: number;
    y: number;
  }