// import { useState } from "react";
import styles from "./Page.module.css";
import ToolPanel from "../components/ToolPanel";
import { ShapeProvider } from "../context/ShapeContext";
import Canvas from "../components/Canvas";
import { CountProvider } from "../context/CountContext";
import CountBar from "../components/CountBar";
import { ListProvider } from "../context/ListContext";
import TitleBox from "../components/TitleBox";
import { TitleProvider } from "../context/TitleContext";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();
  return (
    <div className={styles.paintingPage} dir="rtl">
      <header>
        <h1>Painter App</h1>
      </header>

      <button className={styles.returnButton} onClick={() => navigate("/")}>
        Back
      </button>

      <main>
        <TitleProvider>
          <ListProvider>
            <CountProvider>
              <TitleBox/>
              <div className={styles.group1}>
                <ShapeProvider>
                  <div className={styles.group2}>
                    <Canvas/>
                    <CountBar/>
                  </div>
                  <ToolPanel/>
                </ShapeProvider>
              </div>
            </CountProvider>
          </ListProvider>
        </TitleProvider>
      </main>
    </div>
  );
}
