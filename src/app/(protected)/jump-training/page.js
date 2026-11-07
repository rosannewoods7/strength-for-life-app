import VimeoFacade from '@/components/VimeoFacade';
import styles from './page.module.css';

export const metadata = {
  title: 'Jump Training | Strength for Life',
};

export default function JumpTrainingPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Jump Training</h1>
        <p className={styles.subtitle}>For Strong Bones, Strong Muscles & Healthy Aging</p>
      </header>

      <div className={styles.contentGrid}>
        <section className={styles.videoSection} style={{ marginBottom: 0 }}>
          <h2 className={styles.sectionTitle}>Jump Training Coaching</h2>
          <p className={styles.demoDescription}>
            Watch this coaching session first. We will cover how to safely incorporate jump training, what to expect, and the specific mechanics you need to know.
          </p>
          <div className={styles.coachingVideoWrapper}>
            <VimeoFacade 
              videoId="1203114485" 
              title="Jump Training Coaching" 
            />
          </div>
        </section>

        <aside className={styles.demoSidebar}>
          <div className={styles.stickyDemo}>
            <h2 className={styles.sectionTitle}>Jumping Techniques</h2>
            <p className={styles.demoDescription}>Watch this demonstration to ensure you are prioritizing quality, landing mechanics, and force absorption.</p>
            <div className={styles.videoWrapper}>
              <VimeoFacade 
                videoId="1204042856" 
                title="Jumping Techniques Demo" 
              />
            </div>
          </div>
        </aside>
      </div>

      <section className={styles.fullWidthProtocol} style={{ marginTop: '2rem', paddingTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>The Strength for Life Jump Protocol</h2>
        <p className={styles.protocolIntro}>
          Perform jump training 2-3 times per week.<br/>
          Begin with low-volume, low-impact movements and gradually progress over time.
        </p>
        
        <div className={styles.protocolGrid}>
          <div className={styles.protocolCard}>
            <h4>Week 1-4: Foundation</h4>
            <ul>
              <li>Pogo hops</li>
              <li>March-to-skip drills</li>
              <li>Low box step-offs</li>
              <li>Line hops</li>
              <li>Squat jumps (small amplitude)</li>
            </ul>
            <div className={styles.setsReps}>2 sets of 10-20 contacts</div>
          </div>
          
          <div className={styles.protocolCard}>
            <h4>Week 5-8: Build Power</h4>
            <ul>
              <li>Countermovement jumps</li>
              <li>Lateral hops</li>
              <li>Skater jumps</li>
              <li>Broad jumps</li>
              <li>Box jumps</li>
            </ul>
            <div className={styles.setsReps}>2-3 sets of 6-10 repetitions</div>
          </div>
          
          <div className={styles.protocolCard}>
            <h4>Week 9-12: Power & Performance</h4>
            <ul>
              <li>Repeated jumps</li>
              <li>Multidirectional hops</li>
              <li>Broad jump variations</li>
              <li>Reactive jump drills</li>
              <li>Jump combinations</li>
            </ul>
            <div className={styles.setsReps}>2-4 sets of 5-8 repetitions</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h4 className={styles.miniHeading}>Key Coaching Cues</h4>
            <ul className={styles.cuesList}>
              <li>Land soft but active</li>
              <li>Knees track over toes</li>
              <li>Maintain a tall posture</li>
              <li>Absorb force through hips and legs</li>
              <li>Quality over quantity</li>
            </ul>
          </div>
          <div>
            <p className={styles.disclaimer}>*Disclaimer: If you have osteoporosis, significant arthritis, recent surgery, or a current injury, consult your healthcare provider before beginning higher-impact training.</p>
          </div>
        </div>
      </section>

      <article className={styles.scienceSection} style={{ marginTop: '3rem' }}>
        <h2 className={styles.sectionTitle}>Why We Jump</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div>
            <p>Many adults have been told that jumping is dangerous for their knees, hips, or joints. In reality, when performed correctly and progressed appropriately, jump training is one of the most effective ways to maintain bone density, muscle power, balance, and functional independence as we age.</p>
            <p><strong>The real problem isn't that adults jump too much. It's that most people stop jumping entirely.</strong></p>
            <p>As we get older, we often avoid activities that challenge our fast-twitch muscle fibers and bones. Over time this contributes to declining power, weaker bones, slower reaction times, reduced balance, and an increased risk of falls. Jump training provides the mechanical loading that your body needs to stay strong.</p>

            <h3 className={styles.subheading}>The Science</h3>
            <p>As we age, we naturally lose muscle power faster than we lose muscle strength. Power is your ability to produce force quickly.</p>
            <p>Power is what allows you to:</p>
            <ul className={styles.checkList}>
              <li>Catch yourself if you trip</li>
              <li>Climb stairs easily</li>
              <li>Get up from the floor</li>
              <li>React quickly during sports and recreation</li>
              <li>Maintain balance and prevent falls</li>
            </ul>
            <p>Research consistently shows that power is one of the strongest predictors of healthy aging and independence.</p>
            <p>Jump training also creates brief, high-impact forces that stimulate osteoblast activity and bone formation—an essential defense against age-related bone loss in both men and women.</p>
            
            <h4 className={styles.miniHeading}>Benefits of jump training include:</h4>
            <ul className={styles.benefitList}>
              <li>✓ Increased bone density</li>
              <li>✓ Improved muscle power</li>
              <li>✓ Better balance and coordination</li>
              <li>✓ Improved athletic performance</li>
              <li>✓ Reduced fall risk</li>
              <li>✓ Greater confidence in movement</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.subheading} style={{ marginTop: 0 }}>The Knee Myth</h3>
            <p>A common misconception is that jumping damages healthy knees. In reality, appropriately prescribed jump training strengthens the muscles, tendons, ligaments, and bones that support the knee joint.</p>
            <p>Problems typically occur when technique is poor, progression is too aggressive, or existing injuries are ignored. When introduced gradually, jump training can actually improve joint resilience and function.</p>
            <div className={styles.highlightBox}>
              <p><strong>Remember:</strong> Strong muscles protect joints. Avoiding impact completely often leads to weaker tissues that become less capable of handling life's demands.</p>
            </div>

            <h3 className={styles.subheading}>Jump Training, Core &amp; Pelvic Floor Health</h3>
            <p><strong>Building Tolerance to Impact</strong></p>
            <p>A common concern when returning to impact training is how the core, joints, or pelvic floor will respond. Many people are told that if they experience joint stiffness, core instability, or pelvic pressure/leakage, they should avoid all impact activities indefinitely. While symptoms should never be ignored, avoiding impact forever is rarely the answer.</p>
            <p><strong>The goal is not to avoid challenge. The goal is to build capacity.</strong></p>

            <p>Your deep core and pelvic floor form a muscular cylinder that works together with your hips and spine to absorb and transfer force. Like every other muscle group in your body, these tissues respond to progressive training.</p>
            <p>When you jump, your body experiences increased ground reaction forces that it must absorb and manage. If those forces exceed the current capacity of the system, discomfort or symptoms may occur. This does not automatically mean jumping is harmful—it simply means the demand currently exceeds your tissues' ability to manage it.</p>
            
            <p>Just as you wouldn't expect to squat 200 pounds without gradually building strength, you shouldn't expect your tendons, joints, and deep core to tolerate high-impact exercise without progressive exposure.</p>
          </div>
        </div>

        <div className={styles.coachNote} style={{ marginBottom: 0 }}>
          <strong>Coach's Note:</strong> If you experience persistent joint pain, pressure, or pelvic floor symptoms during or after impact exercise, I strongly encourage you to consult a qualified sports or pelvic health physiotherapist. These movement specialists can help identify the root cause and provide targeted strategies that allow you to continue training with confidence. Too many people are told to stop exercising when what they really need is a smarter progression plan.
        </div>
      </article>
    </div>
  );
}
