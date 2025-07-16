import styles from "./ToolPanel.module.css";
import Shape from "./Shape";
import { useShape } from "../context/ShapeContext";
import { ShapeType } from '../data/ShapeTypes';

const ToolPanel = () => {
  const { selectedShape, setSelectedShape } = useShape();
  const shapes = ["circle", "square", "triangle"] as const;

  const handlePanelClick = () => {
    setSelectedShape(null);
  };

  const handleShapeClick = (shape: ShapeType) => {
    if (selectedShape === shape) {
      setSelectedShape(null);
    } else {
      setSelectedShape(shape);
    }
  };

  return (
    <div 
      className={styles.toolsPanel}
      onClick={handlePanelClick}
      >
      <h3>Tools</h3>

      {shapes.map(shape => (
        <Shape
          key={shape}
          panelType="tools"
          shapeType={shape}
          isSelected={selectedShape === shape}
          onSelect={() => handleShapeClick(shape)}
        />
      ))}
    </div>
  );
};

export default ToolPanel;