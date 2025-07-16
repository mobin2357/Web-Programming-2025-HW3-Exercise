import styles from "./Shape.module.css";
import { useShape } from "../context/ShapeContext";

interface Props {
    panelType: "canvas" | "tools";
    shapeType: "circle" | "square" | "triangle";
    isSelected?: boolean;
    onSelect?: () => void;
    onRemove?: () => void;
    x?: number;
    y?: number;
}

const Shape = ({ panelType, shapeType, isSelected, onSelect, onRemove, x, y }: Props) => {
  const { selectedShape } = useShape();
  const isToolSelected = selectedShape !== null;
  const isInteractive = panelType === "canvas" && !isToolSelected;


  // Handle single click for tool panel
  const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent deselecting when clicking shape
      if (panelType === "tools" && onSelect) {
          onSelect();
      }
  };

  // Handle double click for canvas panel
  const handleDoubleClick = () => {
    console.log(`Removing ...`);
    if (panelType === "canvas" && onRemove) {
      onRemove();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (panelType === 'tools') {
      e.dataTransfer.setData("shape-type", shapeType); // pass shape type via drag data
    }
  };

  const renderShape = () => {
      switch (shapeType) {
        case "circle":
          return (
            <circle
              cx="60"
              cy="52"
              r="40"
              className={`${styles.shapeStroke} ${
                isSelected ? styles.selectedStroke : ""
              }`}
              style={{ pointerEvents: (!isInteractive ? "none" : "stroke"), cursor: isInteractive ? "pointer" : "default" }}
              onDoubleClick={isInteractive ? handleDoubleClick : undefined}
            />
          );
        case "square":
          return (
            <rect
              x="20"
              y="20"
              width="80"
              height="80"
              className={`${styles.shapeStroke} ${
                isSelected ? styles.selectedStroke : ""
              }`}
              style={{ pointerEvents: (!isInteractive ? "none" : "stroke"), cursor: isInteractive ? "pointer" : "default" }}
              onDoubleClick={isInteractive ? handleDoubleClick : undefined}
            />
          );
        case "triangle":
          return (
            <polygon
              className={`${styles.shapeStroke} ${isSelected ? styles.selectedStroke : ""}`} 
              points="60,10 10,90 110,90"
              style={{ pointerEvents: (!isInteractive ? "none" : "stroke"), cursor: isInteractive ? "pointer" : "default" }}
              onDoubleClick={isInteractive ? handleDoubleClick : undefined}
            />
          );
        default:
          return null;
      }
    };

  const canvasStyle: React.CSSProperties =
    panelType === "canvas" && x !== undefined && y !== undefined
    ? {
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }
    : {};

  const shapeClasses = `${styles.butt} ${
    panelType === "canvas" && isToolSelected ? styles.pointerNone : ""
  }`;
  
  return (
      <button
          className={shapeClasses}
          onClick={isInteractive ? undefined : handleClick}
          draggable={panelType === 'tools'}
          onDragStart={handleDragStart} 
          style={{
            ...canvasStyle,
            pointerEvents: panelType === "canvas" ? "none" : "auto", // disables button interaction
          }}
      >
          <svg className={`${styles.shapeButton} ${panelType === "canvas" ? styles.noHover : ""}`}
            width="120" 
            height="104" 
            viewBox="0 0 120 104">
            {renderShape()}
          </svg>
      </button>
  );
}

export default Shape;