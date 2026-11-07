'use client';

import { useState } from 'react';
import styles from './VimeoFacade.module.css';

export default function VimeoFacade({ videoUrl, videoId, weekNumber, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use either the explicit URL or build it from the videoId
  const finalUrl = videoUrl || (videoId ? `https://player.vimeo.com/video/${videoId}` : null);

  if (isPlaying && finalUrl) {
    try {
      // Append autoplay to the finalUrl so it starts immediately when clicked
      const url = new URL(finalUrl);
      url.searchParams.set('autoplay', '1');
      
      return (
        <div className={styles.iframeContainer}>
          <iframe 
            src={url.toString()} 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      );
    } catch (e) {
      console.error("Invalid video URL:", finalUrl);
    }
  }

  const displayTitle = title || (weekNumber ? `Week ${weekNumber} Coaching` : 'Coaching Video');

  return (
    <div className={styles.facadeContainer} onClick={() => { if (finalUrl) setIsPlaying(true); }}>
      <div className={styles.facadeContent}>
        <img src="/icon-512x512.png" alt="Strength for Life Logo" className={styles.logo} />
        <h2 className={styles.title}>{displayTitle}</h2>
      </div>
      <div className={styles.playOverlay}>
        <div className={styles.playButton}>▶</div>
      </div>
    </div>
  );
}
