import styles from "./CountBar.module.css";
import { useCount } from "../context/CountContext";

const CountBar = () => {
  const { counts } = useCount();
  return (
    <div className={styles.countBar}>
      <p>Circle: {counts.circle}</p>
      <p>Square: {counts.square}</p>
      <p>Triangle: {counts.triangle}</p>
    </div>
  );
};

export default CountBar;