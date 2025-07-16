import React, { useRef, useState } from "react";
import { useList } from "../context/ListContext";
import { useCount } from "../context/CountContext";
import { useTitle } from "../context/TitleContext";
import { dummyCurrentUser } from "../data/UserTypes";

import { PlacedShape } from "../data/ShapeTypes";
import styles from "./TitleBox.module.css";

const TitleBox = () => {
  const { exportPainting, setShapesList, savePainting} = useList();
  const { resetCounts, increment } = useCount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { paintingTitle, setPaintingTitle } = useTitle();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(paintingTitle);

  const handleRetrieve = async () => {
    try {
      const username = dummyCurrentUser.username;
      if (!username || username === "0") {
        alert("No logged-in user found. Please log in first.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/paintings/user/${username}`);
      if (!response.ok) {
        throw new Error("Painting not found for this user.");
      }

      const painting = await response.json();
      const data = JSON.parse(painting.jsonData);

      const shapes: PlacedShape[] = data.shapes;
      if (!Array.isArray(shapes)) {
        throw new Error("Invalid painting data format.");
      }

      setShapesList(shapes);

      if (data.title && typeof data.title === "string") {
        setPaintingTitle(data.title);
        setTempTitle(data.title);
      }

      resetCounts();
      shapes.forEach(shape => increment(shape.type));

      alert("Painting retrieved successfully!");
    } catch (err) {
      alert(`Failed to retrieve: ${(err as Error).message}`);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!Array.isArray(json.shapes)) throw new Error("Invalid format");

        const shapes: PlacedShape[] = json.shapes;
        setShapesList(shapes);

        if (json.title && typeof json.title === 'string') {
          setPaintingTitle(json.title);
          setTempTitle(json.title);
        }

        // Recalculate counts
        resetCounts(); // clear previous counts
        shapes.forEach(shape => increment(shape.type));
      } catch (err) {
        alert("Failed to import: Invalid file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setTempTitle(paintingTitle);
  };

  const handleTitleSubmit = () => {
    const finalTitle = tempTitle.trim();
    if (finalTitle) {
      setPaintingTitle(finalTitle);
    } else {
      setTempTitle(paintingTitle); // Reset to previous title if empty
    }
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(paintingTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      handleTitleCancel();
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Use setTimeout to ensure this runs after the browser's default focus behavior
    setTimeout(() => {
      const input = e.target;
      input.setSelectionRange(input.value.length, input.value.length); // Position cursor at the end
    }, 0);
  };

  return (
    <div className={styles.titleBox}>
      {isEditing ? (
        <div className={styles.titleEditContainer}>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleTitleSubmit}
            className={styles.titleInput}
            onFocus={handleInputFocus}
            autoFocus
            maxLength={50}
          />
        </div>
      ) : (
        <h2 
          className={`${styles.title} ${styles.editableTitle}`}
          onClick={handleTitleClick}
          title="Click to edit title"
        >
          {paintingTitle}
        </h2>
      )}
      
      <div className={styles.buttonGroup}>
        <button className={styles.topButton} onClick={handleImportClick}>Import</button>
        <button className={styles.topButton} onClick={exportPainting}>Export</button>
        <button className={styles.topButton} style={{ backgroundColor: "#2e3bed"}} onClick={savePainting}>Save</button>
        <button className={styles.topButton} style={{ backgroundColor: "#2e3bed"}} onClick={handleRetrieve}>Retrieve</button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default TitleBox;
