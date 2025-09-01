// src/components/components.Form/ExportButtons.tsx
import styles from "./ExportButtons.module.css";

interface Props {
  onExportPDF: () => void;
  onExportWord: () => void;
  onExportTXT: () => void;
  onExportJSON: () => void;
  onClearAll: () => void;
}

export default function ExportButtons({
  onExportPDF,
  onExportWord,
  onExportTXT,
  onExportJSON,
  onClearAll,
}: Props) {
  return (
    <div className={styles.exportContainer}>
      <div className={styles.dividerLine}></div> 
      <div className={styles.exportRow}>
        <button type="button" onClick={onExportPDF}>PDF</button>
        <button type="button" onClick={onExportWord}>Word</button>
        <button type="button" onClick={onExportTXT}>TXT</button>
        <button type="button" onClick={onExportJSON}>JSON</button>
        <button type="button" onClick={onClearAll} className={styles.clearAllButton}>Limpar Tudo</button>
      </div>
    </div>
  );
}