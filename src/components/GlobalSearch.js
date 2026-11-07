'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { weeklyData } from '@/lib/weeklyData';
import styles from './GlobalSearch.module.css';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  // Hardcoded vault index since the vault is relatively static.
  const vaultData = [
    { id: 'recovery-vault', title: 'The Recovery Vault (Reading Room)', url: '/vault' },
    { id: 'common-mistakes', title: 'Common Mistakes Guide (Reading Room)', url: '/vault' },
    { id: 'choosing-weights', title: 'How To Choose Your Weights (Reading Room)', url: '/vault' },
    { id: 'protocols', title: 'Recovery Protocols', url: '/vault' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setQuery(term);
    
    if (term.length > 2) {
      const lowerTerm = term.toLowerCase();
      const matches = [];

      // Search Weekly Data
      Object.entries(weeklyData).forEach(([weekNum, data]) => {
        if (
          data.title.toLowerCase().includes(lowerTerm) ||
          data.coachingIntro.toLowerCase().includes(lowerTerm) ||
          data.nutritionFocus.title.toLowerCase().includes(lowerTerm) ||
          data.nutritionFocus.content.toLowerCase().includes(lowerTerm) ||
          data.sleepFocus.title.toLowerCase().includes(lowerTerm) ||
          data.sleepFocus.content.toLowerCase().includes(lowerTerm) ||
          data.stressFocus.title.toLowerCase().includes(lowerTerm) ||
          data.stressFocus.content.toLowerCase().includes(lowerTerm) ||
          data.scienceNugget.toLowerCase().includes(lowerTerm) ||
          data.coachsCorner.toLowerCase().includes(lowerTerm)
        ) {
          matches.push({
            type: 'Week',
            title: `Week ${weekNum}: ${data.title}`,
            url: `/program/week-${weekNum}`
          });
        }
      });

      // Search Vault Data
      vaultData.forEach(item => {
        if (item.title.toLowerCase().includes(lowerTerm)) {
          matches.push({
            type: 'Vault',
            title: item.title,
            url: item.url
          });
        }
      });

      setResults(matches);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <div className={styles.inputContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Search..." 
          value={query}
          onChange={handleSearch}
          onFocus={() => { if (query.length > 2) setIsOpen(true); }}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((result, idx) => (
            <div 
              key={idx} 
              className={styles.resultItem}
              onClick={() => handleSelect(result.url)}
            >
              <span className={styles.resultType}>{result.type}</span>
              <span className={styles.resultTitle}>{result.title}</span>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length > 2 && results.length === 0 && (
        <div className={styles.dropdown}>
          <div className={styles.noResults}>No results found for "{query}"</div>
        </div>
      )}
    </div>
  );
}
