'use client';

import styles from '../jump-training/page.module.css';

export default function FlexibilityMobilityTrainingPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Flexibility &amp; Mobility Training</h1>
        <p className={styles.subtitle}>For Joint Resilience, Movement Freedom, Posture &amp; Injury Prevention</p>
      </header>

      <section className={styles.fullWidthProtocol} style={{ marginTop: '1rem', paddingTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>The Strength for Life Flexibility &amp; Mobility Protocol</h2>
        <p className={styles.protocolIntro}>
          Perform dedicated flexibility and mobility training <strong>1–2 times per week</strong> (15–25 minutes per session),<br/>
          or weave 5–10 minute mobility flows into your warm-ups, cool-downs, and active recovery days.
        </p>

        <div className={styles.protocolGrid}>
          <div className={styles.protocolCard}>
            <h4>Pillar 1: Thoracic Spine &amp; Shoulders</h4>
            <ul>
              <li>Quadruped thoracic rotations (Open Books)</li>
              <li>Cat-Cow segmental spinal articulation</li>
              <li>Wall slides &amp; scapular controlled rotations</li>
              <li>Doorway / floor pec &amp; lat openers</li>
              <li>Overhead dowel or band pass-throughs</li>
            </ul>
            <div className={styles.setsReps}>1–2 sets of 6–8 slow, controlled reps or 30–45s holds</div>
          </div>

          <div className={styles.protocolCard}>
            <h4>Pillar 2: Hips, Pelvis &amp; Lumbar Spine</h4>
            <ul>
              <li>90/90 hip switches &amp; internal/external rotations</li>
              <li>Half-kneeling hip flexor &amp; psoas stretch</li>
              <li>World&apos;s Greatest Stretch (lunge + rotation)</li>
              <li>Deep squat pry &amp; adductor rock-backs</li>
              <li>Supine figure-4 glute &amp; piriformis release</li>
            </ul>
            <div className={styles.setsReps}>1–2 sets of 6–8 controlled reps or 45–60s breathing holds</div>
          </div>

          <div className={styles.protocolCard}>
            <h4>Pillar 3: Ankles, Knees &amp; Connective Tissue</h4>
            <ul>
              <li>Knee-to-wall ankle dorsiflexion rocks</li>
              <li>Active hamstring sweeps &amp; supine nerve glides</li>
              <li>Standing calf &amp; soleus eccentric stretches</li>
              <li>Foot intrinsic mobilization &amp; toe yoga</li>
              <li>Parasympathetic nasal breathing down-regulation</li>
            </ul>
            <div className={styles.setsReps}>15–25 minutes total • 1–2x per week</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h4 className={styles.miniHeading}>Execution Guidelines</h4>
            <p><strong>Move With Control, Not Force:</strong> Never force a joint past a pinch or sharp pain. Aim for a gentle-to-moderate sensation of tension (5–6 out of 10) while maintaining slow, relaxed breathing.</p>
            <p><strong>Pair Breath With Range:</strong> Inhale for 4 seconds through your nose, and exhale slowly for 6–8 seconds as you sink into end-range stretches. Slow exhalations signal your nervous system to release protective muscle guarding.</p>
          </div>
          <div>
            <div className={styles.highlightBox} style={{ margin: '0 0 1rem 0' }}>
              <p><strong>Flexibility vs. Mobility:</strong> <em>Flexibility</em> is the passive range of motion a muscle allows. <em>Mobility</em> is your ability to actively control a joint through that range of motion. Strength for Life trains both so your joints are not just loose—they are strong and stable at every angle.</p>
            </div>
            <p><strong>Remember:</strong> Better mobility directly unlocks better strength. When your hips, ankles, and thoracic spine move freely, your squats, hinges, and overhead presses become safer, stronger, and more effective.</p>
          </div>
        </div>
      </section>

      <article className={styles.scienceSection} style={{ marginTop: '3rem' }}>
        <h2 className={styles.sectionTitle}>Why Flexibility &amp; Mobility Matter as We Age</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div>
            <p>As we move through our 40s, 50s, 60s, and beyond, collagen fibers in our tendons, ligaments, and fascia naturally experience increased cross-linking and reduced hydration. Combined with modern desk postures and repetitive daily patterns, joints gradually lose their usable range of motion.</p>
            <p>When a joint loses mobility—most commonly the <strong>ankles, hips, and thoracic (mid-back) spine</strong>—neighbouring joints are forced to compensate. Stiff hips and thoracic spine often show up as lower-back discomfort; stiff ankles often show up as knee strain; stiff shoulders and mid-backs often show up as neck or rotator cuff irritation.</p>

            <h3 className={styles.subheading}>The Science of Joint Longevity</h3>
            <p>Joint cartilage has no direct blood supply of its own. Instead, it relies on <strong>synovial fluid diffusion</strong>—which is stimulated when you move a joint through its full, controlled range of motion.</p>
            <p>Dedicated mobility and flexibility sessions provide three critical adaptations:</p>
            <ul className={styles.checkList}>
              <li><strong>Joint Lubrication:</strong> Moving joints through full arcs circulates synovial fluid, nourishing articular cartilage.</li>
              <li><strong>Fascial &amp; Tendon Remodeling:</strong> Slow, controlled loading and stretching maintain tissue elasticity and slide-and-glide between muscle layers.</li>
              <li><strong>Nervous System Down-Regulation:</strong> Combining mobility work with slow nasal breathing shifts your body out of sympathetic (&ldquo;fight-or-flight&rdquo;) stress and into parasympathetic recovery.</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.subheading} style={{ marginTop: 0 }}>Benefits of 1–2x Weekly Mobility Training</h3>
            <ul className={styles.benefitList}>
              <li>✓ Greater joint comfort and reduced morning stiffness</li>
              <li>✓ Improved squat depth, hip hinge mechanics, and overhead reach</li>
              <li>✓ Better posture, spinal alignment, and balance</li>
              <li>✓ Reduced risk of compensatory strains and overuse injuries</li>
              <li>✓ Faster recovery between strength training workouts</li>
              <li>✓ Long-term physical independence—getting down to and up from the floor with ease</li>
            </ul>

            <h3 className={styles.subheading}>How to Schedule Your Sessions</h3>
            <p>You don&apos;t need an hour-long class to see dramatic improvements in how your body feels and moves. Choose the approach that fits your week best:</p>
            <p><strong>Option A (Dedicated Sessions):</strong> Complete one or two 15–20 minute full-body mobility &amp; stretching sessions on your non-lifting days or in the evening before bed to improve sleep quality.</p>
            <p><strong>Option B (Post-Workout Integration):</strong> Add 10–15 minutes of targeted mobility and static stretching immediately after two of your weekly strength or cardio sessions while your tissues are warm.</p>
          </div>
        </div>

        <div className={styles.coachNote} style={{ marginBottom: 0 }}>
          Strength without mobility feels rigid. Mobility without strength lacks stability.<br/><br/>
          When you combine progressive resistance training, cardiorespiratory conditioning, and 1–2 weekly sessions of intentional flexibility and mobility work, you build a body that is strong, capable, and pain-free in every plane of motion.<br/><br/>
          <strong>That&apos;s what we mean when we say &ldquo;Built for Strength. Built for Life.&rdquo;</strong>
        </div>
      </article>
    </div>
  );
}
