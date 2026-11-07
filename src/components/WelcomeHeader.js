'use client'
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from '@/app/(protected)/dashboard/page.module.css';

export default function WelcomeHeader({ initialName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName || '');
  const [displayName, setDisplayName] = useState(initialName || '');
  const [saving, setSaving] = useState(false);

  const saveName = async (e) => {
    e?.preventDefault();
    if (!name.trim()) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: { first_name: name.trim() }
    });
    setDisplayName(name.trim());
    setIsEditing(false);
    setSaving(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') {
      setName(displayName);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing || !displayName ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h1 className={styles.welcomeTitle} style={{ margin: 0 }}>Welcome back,</h1>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Your name"
            style={{ 
              fontSize: '2.25rem', 
              fontWeight: '700', 
              fontFamily: 'inherit', 
              color: 'var(--color-white)', 
              background: 'rgba(255, 255, 255, 0.15)', 
              border: '1px solid rgba(255, 255, 255, 0.3)', 
              borderRadius: '8px', 
              padding: '0.25rem 0.75rem', 
              outline: 'none', 
              width: '220px',
              letterSpacing: '-0.02em',
            }}
            autoFocus
          />
          <button 
            onClick={saveName} 
            disabled={saving || !name.trim()} 
            style={{ 
              background: 'var(--color-soft-gold)', 
              color: 'var(--color-deep-espresso)', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '0.6rem 1.2rem', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {saving ? '...' : 'Save'}
          </button>
        </div>
      ) : (
        <h1 
          className={styles.welcomeTitle} 
          style={{ cursor: 'pointer', transition: 'opacity 0.2s' }} 
          onClick={() => setIsEditing(true)} 
          title="Click to edit name"
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Welcome back, {displayName}.
        </h1>
      )}
      <p className={styles.welcomeSubtitle}>Let's build your baseline.</p>
    </div>
  );
}
