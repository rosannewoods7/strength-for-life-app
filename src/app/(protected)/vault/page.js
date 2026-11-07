'use client';

import { useState } from 'react';
import DocumentViewer from '@/components/DocumentViewer';
import RecoveryProtocols from '@/components/RecoveryProtocols';
import styles from './page.module.css';

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState('readingRoom');

  const documents = [
    {
      id: 'recovery',
      title: 'The Recovery Vault Guide',
      url: '/vault/recovery-vault.pdf'
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes Guide',
      url: '/vault/common-mistakes.pdf'
    },
    {
      id: 'weights',
      title: 'How To Choose Your Weights',
      url: '/vault/choosing-weights.pdf'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Recovery Vault</h1>
        <p className={styles.subtitle}>Your central library for protocols, guides, and restoration tools.</p>
        
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'readingRoom' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('readingRoom')}
          >
            The Reading Room
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'protocols' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('protocols')}
          >
            Recovery Protocols
          </button>
        </div>
      </header>

      {activeTab === 'readingRoom' && (
        <div className={styles.documentSection}>
          <DocumentViewer documents={documents} />
        </div>
      )}

      {activeTab === 'protocols' && (
        <div className={styles.protocolSection}>
          <RecoveryProtocols />
        </div>
      )}

    </div>
  );
}
