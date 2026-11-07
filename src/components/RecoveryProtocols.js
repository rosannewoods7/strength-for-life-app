'use client';

import styles from '@/app/(protected)/vault/page.module.css';

export default function RecoveryProtocols() {
  return (
    <div className={styles.protocolsContainer}>
      
      <div className={styles.protocolCard}>
        <div className={styles.protocolHeader}>
          <h2>What is Active Recovery?</h2>
          <p>Active recovery refers to low-intensity, restorative movement performed on your non-lifting days. Unlike passive rest (doing nothing), active recovery gently increases blood flow, which delivers oxygen and nutrients to repairing tissues and clears metabolic waste, significantly speeding up your recovery process.</p>
        </div>
        
        <div className={styles.protocolContent}>
          <div className={styles.protocolSteps}>
            <div className={styles.stepBlock}>
              <h3>The Golden Rule of Active Recovery</h3>
              <p>You should always feel better and more energized <strong>after</strong> an active recovery session than you did before you started. If you feel fatigued, you pushed too hard.</p>
            </div>

            <div className={styles.stepBlock}>
              <h3>Intensity Guidelines</h3>
              <p>Keep your heart rate low (Zone 1 or low Zone 2). You should easily be able to maintain a conversation through your nose without gasping for breath.</p>
            </div>

            <div className={styles.stepBlock}>
              <h3>Examples of Active Recovery</h3>
              <ul>
                <li>A brisk 30 to 45-minute outdoor walk.</li>
                <li>Leisurely cycling on a flat path or stationary bike.</li>
                <li>The 10-Minute Connective Tissue & Mobility Protocol (below).</li>
                <li>Restorative or gentle Yin yoga.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.protocolCard} style={{ marginTop: '3rem' }}>
        <div className={styles.protocolHeader}>
          <h2>The 15-Minute Pre-Sleep Downregulation Protocol</h2>
          <p>Sleep architecture is defined by both continuity and restorative depth. This protocol focuses on strategies that support circadian regulation, stress modulation, and pre-sleep nervous system downregulation.</p>
        </div>
        
        <div className={styles.protocolContent}>

          <div className={styles.protocolSteps}>
            <div className={styles.stepBlock}>
              <h3>Phase 1: Environmental & Sensory Shift (Minutes 1–5)</h3>
              <p><strong>The Goal:</strong> Trigger your natural circadian regulation by mimicking sunset and reducing sensory load.</p>
              <ul>
                <li>Turn off all bright, overhead lighting and transition strictly to dim, warm-toned lamps.</li>
                <li>Put away all screens (phones, tablets, televisions) to reduce blue light.</li>
                <li>Lower the temperature of your bedroom to support a drop in core body temperature.</li>
              </ul>
            </div>

            <div className={styles.stepBlock}>
              <h3>Phase 2: Physical Decompression (Minutes 5–10)</h3>
              <p><strong>The Goal:</strong> Release lingering mechanical tension and signal physical safety to your nervous system.</p>
              <ul>
                <li><strong>Supported Child's Pose (2.5 Mins):</strong> Kneel and sit back on your heels, resting your torso over a thick pillow. Breathe into your lower back.</li>
                <li><strong>Supine Spinal Twist (2.5 Mins):</strong> Lie on your back, hug knees to chest, and gently let them fall to one side. Hold for 75 seconds per side.</li>
              </ul>
            </div>

            <div className={styles.stepBlock}>
              <h3>Phase 3: Parasympathetic Breathing (Minutes 10–15)</h3>
              <p><strong>The Goal:</strong> Manually shift your central nervous system out of a stress state.</p>
              <ul>
                <li><strong>The 4-7-8 Breath:</strong> Inhale through the nose for 4 seconds. Hold gently for 7 seconds. Exhale completely through the mouth for 8 seconds.</li>
                <li><strong>The Dose:</strong> Repeat this cycle for the final 5 minutes to act as a biological "off switch".</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.protocolCard} style={{ marginTop: '3rem' }}>
        <div className={styles.protocolHeader}>
          <h2>The 10-Minute Connective Tissue & Mobility Protocol</h2>
          <p>Perform this routine on your designated rest days, or as a dedicated cool-down 48 hours after a heavy lower-body session. Focus on the quality of the movement, not the speed.</p>
        </div>
        
        <div className={styles.protocolContent}>

          <div className={styles.protocolSteps}>
            <div className={styles.stepBlock}>
              <h3>1. Parasympathetic Downregulation (1 Min)</h3>
              <p>Lie flat on your back, knees bent. Inhale quietly for 4s, exhale slowly for 6s. Repeat 6-8 times to allow tissues to relax.</p>
            </div>

            <div className={styles.stepBlock}>
              <h3>2. Quadruped Thoracic Rotations (2 Mins)</h3>
              <p>Start on hands and knees. Place right hand behind head. Rotate right elbow toward left wrist, then reverse and open chest to ceiling. <strong>8 slow reps per side.</strong></p>
            </div>

            <div className={styles.stepBlock}>
              <h3>3. The 90/90 Hip Swivel (3 Mins)</h3>
              <p>Sit with both legs bent at 90-degree angles (one in front, one to the side). Slowly pivot knees over to the opposite side. <strong>10 slow transitions (5 per side).</strong></p>
            </div>

            <div className={styles.stepBlock}>
              <h3>4. Kneeling Ankle Rockers (2 Mins)</h3>
              <p>Half-kneeling position. Keep front heel glued to floor, slowly drive front knee forward over middle toes. Hold for 3s. <strong>10 controlled rockers per leg.</strong></p>
            </div>

            <div className={styles.stepBlock}>
              <h3>5. Controlled Articular Rotations (CARs) for Shoulders (2 Mins)</h3>
              <p>Stand tall. Keep arm completely straight and slowly trace the largest circle possible. Glacial pace (10s per circle). <strong>3 circles forward, 3 backward, per arm.</strong></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
