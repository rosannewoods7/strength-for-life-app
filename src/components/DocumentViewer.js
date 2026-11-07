'use client';

import { useState } from 'react';
import styles from './DocumentViewer.module.css';

export default function DocumentViewer({ documents }) {
  const [activeDoc, setActiveDoc] = useState(documents[0]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>The Reading Room</h3>
        <ul className={styles.docList}>
          {documents.map((doc) => (
            <li 
              key={doc.id}
              className={`${styles.docItem} ${activeDoc.id === doc.id ? styles.active : ''}`}
              onClick={() => setActiveDoc(doc)}
            >
              <span className={styles.docIcon}>📄</span>
              <span className={styles.docTitle}>{doc.title}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.viewerContent}>
        <div className={styles.viewerHeader}>
          <h2>{activeDoc.title}</h2>
          <a href={activeDoc.url} download className={styles.downloadButton}>
            Download PDF
          </a>
        </div>
        <div className={styles.iframeContainer}>
          <div className={styles.mobileFallback}>
            <p>PDF previews are limited on mobile screens.</p>
            <a href={activeDoc.url} target="_blank" rel="noopener noreferrer" className={styles.mobileOpenButton}>
              Open Document
            </a>
          </div>
          <iframe 
            src={`${activeDoc.url}#view=FitH`} 
            className={styles.pdfIframe}
            title={activeDoc.title}
          />
        </div>
      </div>
    </div>
  );
}
