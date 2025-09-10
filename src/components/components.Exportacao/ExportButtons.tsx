// src/components/components.Exportacao/ExportButtons.tsx
import styles from "./ExportButtons.module.css";

interface Props {
  onExportPDF: () => void;
  onExportWord: () => void;
  onExportTXT: () => void;
  onExportJSON: () => void;
  onClearAll: () => void;
  onImportJSON: () => void;
}

export default function ExportButtons({
  onExportPDF,
  onExportWord,
  onExportTXT,
  onExportJSON,
  onClearAll,
  onImportJSON
}: Props) {
  return (
    <div className={styles.exportContainer}>
      <div className={styles.dividerLine}></div>
      <div className={styles.exportRow}>
        <button type="button" onClick={onExportPDF}>PDF</button>
        <button type="button" onClick={onExportWord}>Word</button>
        <button type="button" onClick={onExportTXT}>TXT</button>
        <button type="button" onClick={onExportJSON}>JSON</button>

        <button onClick={onImportJSON}>Importar JSON</button>


        <button type="button" onClick={onClearAll} className={styles.clearAllButton}>Limpar Tudo</button>
      </div>
    </div>
  );
}
