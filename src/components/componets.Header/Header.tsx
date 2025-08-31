import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>
        Seu Currículo <b>Interactive</b> <span>🌙</span>
      </h1>
      <p>Crie seu currículo perfeito com elegância e simplicidade</p>
      <div className={styles.dots}>•••</div>
    </header>
  );
};

export default Header;
