import React from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { isDarkMode} = useTheme();

  return (
    <header className={styles.header}>
      <h1>
        Seu Currículo <span className={styles.highlight}>Interactive</span>{" "}
       
       <button 
          className={styles.themeToggle}
          /*  onClick  ={toggleTheme}  */ 
          aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          title={isDarkMode ? "Modo claro" : "Modo escuro"}
        >
          <span className={styles.themeIcon}>
            {isDarkMode ? '☀️' : '🌙'}
          </span>
        </button>   

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