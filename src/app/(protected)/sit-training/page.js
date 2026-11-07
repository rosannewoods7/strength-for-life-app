'use client';

import { useState } from 'react';
import VimeoFacade from '@/components/VimeoFacade';
import styles from '../jump-training/page.module.css';

const DEMOS = [
  { id: 'ropes', title: 'Battle Ropes', videoId: '1204039587' },
  { id: 'slamballs', title: 'Slam Balls', videoId: '1204039425' },
  { id: 'kettlebells', title: 'Kettlebell Swings', videoId: '1204039718' },
  { id: 'squatjumps', title: 'Squat Jumps', videoId: '1204040067' },
];

export default function SitTrainingPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sprint Interval Training (SIT)</h1>
        <p className={styles.subtitle}>For Metabolic Health & Longevity</p>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Side: Coaching Video */}
        <section className={styles.videoSection} style={{ marginBottom: 0 }}>
          <h2 className={styles.sectionTitle}>SIT Coaching Video</h2>
          <p className={styles.demoDescription}>
            Watch this coaching session first to understand the purpose of SIT, how to manage your intensity, and how to scale your effort appropriately.
          </p>
          <div className={styles.coachingVideoWrapper}>
            <VimeoFacade 
              videoId="1203114486" 
              title="SIT Coaching Video" 
            />
          </div>
        </section>

        {/* Right Side: Exercise Demos */}
        <aside className={styles.demoSidebar}>
          <div className={styles.stickyDemo}>
            <h2 className={styles.sectionTitle}>Exercise Demos</h2>
            <p className={styles.demoDescription}>Select a modality to view the technique demonstration.</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {DEMOS.map((demo, index) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === index ? 'var(--color-dusty-rose)' : 'var(--color-lavender-grey)',
                    color: activeTab === index ? 'var(--color-white)' : 'var(--color-deep-plum)',
                    cursor: 'pointer',
                    fontWeight: activeTab === index ? '600' : 'normal',
                    transition: 'all 0.2s ease',
                    flex: '1 1 calc(50% - 0.5rem)',
                    textAlign: 'center'
                  }}
                >
                  {demo.title}
                </button>
              ))}
            </div>

            <div className={styles.videoWrapper} key={DEMOS[activeTab].id}>
              <VimeoFacade 
                videoId={DEMOS[activeTab].videoId} 
                title={`${DEMOS[activeTab].title} Demo`}
              />
            </div>
          </div>
        </aside>
      </div>

      <section className={styles.fullWidthProtocol} style={{ marginTop: '2rem', paddingTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>The Strength for Life SIT Protocol</h2>
        <p className={styles.protocolIntro}>
          Perform SIT training 1-2 times per week on non-consecutive days.<br/>
          Choose one movement and work as hard as you safely can during each interval.
        </p>

        <div className={styles.protocolGrid}>
          <div className={styles.protocolCard}>
            <h4>Beginner Protocol</h4>
            <div className={styles.setsReps}>
              <strong>20s work</strong><br/>
              120s recovery<br/><br/>
              Repeat 4-6 times
            </div>
          </div>
          
          <div className={styles.protocolCard}>
            <h4>Intermediate Protocol</h4>
            <div className={styles.setsReps}>
              <strong>30s work</strong><br/>
              90s recovery<br/><br/>
              Repeat 5-8 times
            </div>
          </div>
          
          <div className={styles.protocolCard}>
            <h4>Advanced Protocol</h4>
            <div className={styles.setsReps}>
              <strong>30s work</strong><br/>
              60-90s recovery<br/><br/>
              Repeat 8-10 times
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h4 className={styles.miniHeading}>Effort Guidelines</h4>
            <p><strong>During the work interval:</strong> Effort should feel like 9-10 out of 10. You should be breathing heavily. Conversation should be difficult or impossible.</p>
            <p><strong>During recovery:</strong> Slow your breathing. Allow heart rate to decrease. Prepare for the next interval. The recovery period is part of the protocol. It allows you to produce high-quality effort every round.</p>
          </div>
          <div>
            <div className={styles.highlightBox} style={{ margin: '0 0 1rem 0' }}>
              <p><strong>The Objective:</strong> The goal is not to survive the workout. The objective is to produce repeated bursts of high-quality effort. A few minutes of true sprint interval training can create powerful adaptations that support metabolic health, cardiovascular fitness, and healthy aging.</p>
            </div>
            <p><strong>Remember:</strong> Strength training builds the engine. Sprint interval training improves the horsepower. Together, they create a stronger, healthier, more resilient body for life.</p>
          </div>
        </div>
      </section>

      <article className={styles.scienceSection} style={{ marginTop: '3rem' }}>
        <h2 className={styles.sectionTitle}>Why SIT?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div>
            <p>Most people believe sprint interval training means running as fast as possible on a treadmill. It doesn't.</p>
            <p>Sprint Interval Training is simply brief periods of maximal effort followed by recovery. <strong>The goal isn't running. The goal is intensity.</strong></p>
            <p>You can achieve that intensity using battle ropes, kettlebell swings, slam balls, cycling, rowing, stairs, ski erg, assault bike, or squat jumps.</p>
            <p>If you can work very hard for a short period of time, you're performing SIT. As long as your heart rate spikes and you are generating your maximum power output, the specific modality you choose simply does not matter.</p>
            
            <h3 className={styles.subheading}>The Sprint Myth</h3>
            <p>Sprint Interval Training does NOT require running. The body responds to intensity, not the exercise mode. A kettlebell swing performed with maximum effort can create the same physiological adaptations as a running sprint. What matters is how hard you work—not whether your feet are moving.</p>
            <p>This is especially valuable for anyone who dislikes running, has joint concerns, is returning to exercise, or prefers resistance-based conditioning.</p>
          </div>

          <div>
            <h3 className={styles.subheading} style={{ marginTop: 0 }}>The Science</h3>
            <p>Sprint Interval Training is one of the most time-efficient methods for improving:</p>
            <ul className={styles.benefitList}>
              <li>✓ Cardiovascular fitness &amp; VO₂ max</li>
              <li>✓ Mitochondrial function &amp; Insulin sensitivity</li>
              <li>✓ Blood sugar control &amp; Metabolic flexibility</li>
              <li>✓ Fat oxidation &amp; Longevity markers</li>
            </ul>
            <p>Research shows that improving cardiorespiratory fitness is one of the strongest predictors of long-term health and mortality reduction.</p>

            <h3 className={styles.subheading}>The Longevity Advantage</h3>
            <p>Many people believe they need long hours of steady-state cardio to improve fitness or body composition. In reality, excessive endurance volume can increase fatigue, recovery demands, and time commitment without producing superior metabolic results.</p>
            <p>Short, intense intervals allow you to build VO₂ max, improve metabolic health, and preserve lean muscle mass while saving time and increasing daily energy.</p>
          </div>
        </div>

        <div className={styles.coachNote} style={{ marginBottom: 0 }}>
          We don't jump to burn calories. We jump to build strong bones and powerful muscles.<br/><br/>
          We don't do sprint intervals to shrink ourselves. We do them to build a stronger heart, healthier metabolism, and a body that remains capable for decades to come.<br/><br/>
          <strong>That's what we mean when we say "Built for Strength. Built for Life."</strong>
        </div>
      </article>
    </div>
  );
}
