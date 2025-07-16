import React, { useRef } from "react";
import styles from "./Canvas.module.css";
import Shape from "./Shape";
import { useShape } from "../context/ShapeContext";
import { useCount } from "../context/CountContext";
import { ShapeType, PlacedShape } from '../data/ShapeTypes';
import { useList } from "../context/ListContext";

const Canvas = () => {
  const { selectedShape, setSelectedShape } = useShape();
  const { increment, decrement } = useCount();
  const { shapesList, setShapesList } = useList();
  const canvasRef = useRef<HTMLDivElement>(null);

  const placeShape = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedShape) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const existingIds = shapesList.map((form) => form.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const newShape: PlacedShape = {
      id: newId,
      type: selectedShape,
      x,
      y
    };
    setShapesList((prev: PlacedShape[]) => [...prev, newShape]);
    setSelectedShape(null);
    increment(selectedShape)
  };

  const handleRemove = (id: number) => {
    const shape = shapesList.find(s => s.id === id);
    if (shape) decrement(shape.type);
    setShapesList((prev: PlacedShape[]) => prev.filter(shape => shape.id !== id));    
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  
    const type = e.dataTransfer.getData("shape-type") as ShapeType;
    if (!type) return;
  
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
  
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
  
    const existingIds = shapesList.map((form) => form.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const newShape: PlacedShape = {
      id: newId,
      type: type,
      x,
      y
    };
    setShapesList((prev: PlacedShape[]) => [...prev, newShape]);
    increment(type);
  };

  return (
    <div 
      className={styles.canvas}
      onClick={placeShape}
      ref={canvasRef}
      onDragOver={(e) => e.preventDefault()} // allow drop
      onDrop={handleDrop}
      >

      {shapesList.map(shape => (
        <Shape
          key={shape.id}
          panelType="canvas"
          shapeType={shape.type!}
          isSelected={false}
          x={shape.x}
          y={shape.y}
          onRemove={() => handleRemove(shape.id)}
        />
      ))}
    </div>
  );
};

export default Canvas;