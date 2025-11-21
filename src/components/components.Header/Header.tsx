import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {

  return (
    <header className={styles.header}>
      <h1>
        Seu Currículo <span className={styles.highlight}>Interactive</span>{" "}


      </h1>
      <p>Mostre quem você é, não só o que você fez.</p>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;