'use client';

import Image from 'next/image';
import styles from './page.module.css';

export default function FrameworkPage() {
  const graphics = [
    {
      id: 'pyramid',
      title: 'The Metabolic Shift Pyramid',
      src: '/pyramid.png',
      alt: 'The Metabolic Shift Pyramid showing hierarchical priorities for adult metabolic health and longevity.',
      content: (
        <>
          <p>
            The adult metabolic shift is a physiological transition point, not simply a chronological milestone. Many adults enter their 40s, 50s, and beyond feeling as though their body has suddenly become unpredictable. This is not a failure of effort; it is the result of a coordinated shift across multiple biological systems—especially how our bodies process and regulate blood glucose.
          </p>
          <div className={styles.detailBox}>
            <p><strong>The Biological Realities &amp; The Power of Glucose Control:</strong></p>
            <ul>
              <li><strong>Glucose Control &amp; Insulin Sensitivity:</strong> As we get older, gradual declines in muscle mass and mitochondrial efficiency make our cells more resistant to insulin. When blood sugar spikes and crashes frequently, excess glucose is preferentially stored as visceral (deep abdominal) fat, inflammation rises, and advanced glycation end-products (AGEs) accelerate tissue aging.</li>
              <li><strong>Why Managing Blood Sugar Changes Everything:</strong> Stabilizing blood glucose as we age delivers immediate and long-term benefits—eliminating mid-afternoon energy crashes and brain fog, curbing cravings, protecting cardiovascular and cognitive health, reducing chronic inflammation, and allowing the body to access stored fat for fuel.</li>
              <li><strong>Cortisol &amp; Sleep Connection:</strong> Chronic stress and fragmented sleep directly elevate fasting blood glucose and cortisol, making glucose regulation harder even when your diet hasn&apos;t changed.</li>
              <li><strong>Muscle as Your Primary Glucose Sink:</strong> Skeletal muscle is responsible for clearing up to 80% of post-meal glucose from your bloodstream. By combining progressive strength training with protein-forward, blood-sugar-stabilizing nutrition, you build a larger &ldquo;metabolic sink&rdquo; that naturally masters glucose control for life.</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 'pillars',
      title: 'The Strength for Life Framework',
      src: '/pillars.png',
      alt: 'The 5-Pillar System of the Strength for Life program.',
      content: (
        <>
          <p>
            Adult health is often approached in isolation. People are told to focus on diet, or blood sugar, or exercise—rarely are these systems addressed together. This framework integrates our five core pillars because you cannot optimize one pillar while neglecting the others.
          </p>
          <div className={styles.detailBox}>
            <p><strong>The Five Pillars:</strong></p>
            <ul>
              <li><strong>Strength Training &amp; Muscle Preservation:</strong> Muscle is the primary driver of metabolic health and physical function. As we age, preserving muscle and power is not optional—it is foundational.</li>
              <li><strong>Nutrition &amp; Metabolic Health:</strong> Nutrition provides the raw materials, emphasizing adequate protein to overcome anabolic resistance and support lean tissue repair.</li>
              <li><strong>Glucose Control &amp; Insulin Sensitivity:</strong> Managing blood sugar spikes through muscle contraction, meal composition, and movement timing protects vascular health, sustains daily energy, and prevents visceral fat accumulation as we age.</li>
              <li><strong>Stress &amp; Sleep Optimization:</strong> Stress and recovery determine how effectively the body can repair. Poor sleep disrupts appetite regulation, insulin sensitivity, and fat storage.</li>
              <li><strong>Longevity &amp; Healthy Aging:</strong> This integrates the outcomes of the first four pillars into a long-term vision for healthspan.</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 'wheel',
      title: 'Wheel of Interconnected Health',
      src: '/wheel.png',
      alt: 'Circular wheel demonstrating how different health pillars interconnect.',
      content: (
        <>
          <p>
            This model is not a hierarchy; there is no single "most important" pillar. Instead, think of this system as a wheel. When all five segments are strong and balanced, the wheel moves smoothly. When one segment is underdeveloped, the entire system becomes unstable and creates a negative cascade.
          </p>
          <div className={styles.detailBox}>
            <p><strong>The Interconnection in Action:</strong></p>
            <ul>
              <li><strong>Strength ↔ Nutrition:</strong> Strength training creates the stimulus for muscle adaptation, but nutrition determines whether the body has the resources to respond. If protein is insufficient, recovery is delayed.</li>
              <li><strong>Nutrition ↔ Hormones:</strong> Inadequate caloric intake or unstable blood sugar can elevate cortisol and increase stress hormones, accelerating muscle loss.</li>
              <li><strong>Recovery ↔ Sleep:</strong> Physiological stress disrupts sleep architecture, while poor sleep worsens hormonal balance and recovery capacity, creating a feedback loop of fatigue.</li>
              <li><strong>Stress ↔ Metabolism:</strong> Chronic stress elevates cortisol, impairing insulin sensitivity and promoting visceral fat storage. Stress management is a key metabolic intervention.</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 'longevity',
      title: 'The Longevity Curve',
      src: '/longevity.png',
      alt: 'Graph showing the trajectory of longevity based on interventions.',
      content: (
        <>
          <p>
            The ultimate goal of the Strength for Life framework is not simply to improve short-term outcomes, but to extend <strong>healthspan</strong>—the years lived with strength, independence, and vitality.
          </p>
          <div className={styles.detailBox}>
            <p><strong>The Compounding Effect:</strong></p>
            <p>Longevity is not a separate behavior. It is the compounding result of consistent practices across the other four pillars. When aligned, the results are not just additive—they compound over time:</p>
            <ul>
              <li>Strength training improves insulin sensitivity.</li>
              <li>Improved insulin sensitivity enhances daily energy levels.</li>
              <li>Better energy supports consistent, rigorous training.</li>
              <li>Consistent training reinforces muscle preservation and bone density, directly predicting long-term independence and fall reduction.</li>
            </ul>
          </div>
        </>
      )
    }
  ];

  return (
    <div className={styles.frameworkContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Framework</h1>
        <div className={styles.subtitle}>
          <p style={{ marginBottom: '1rem' }}>
            The Strength for Life Framework is a science-based roadmap designed for men and women committed to building lasting physical capacity and metabolic resilience. Rather than focusing on quick fixes or isolated fitness goals, this framework recognizes that strength, metabolism, physiology, sleep, stress, and long-term health are deeply interconnected.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            By addressing the five key pillars of health together, you can create meaningful, lasting improvements in how you feel, function, and age. This framework serves as the foundation for everything you will learn and implement throughout Strength for Life, helping you build a stronger, healthier, and more resilient body for the decades ahead.
          </p>
          <p>
            <strong>Built for Strength. Built for Life. This framework shows you how.</strong>
          </p>
        </div>
      </header>

      <section className={styles.introSection}>
        <h2 className={styles.introTitle}>The Longevity Opportunity</h2>
        <div className={styles.introContent}>
          <p>
            The decades from 35 onward are a critical window in which lifestyle choices have a powerful influence on long-term healthspan. Without intentional intervention, muscle mass and bone density naturally decline, metabolism slows, and cumulative stress loads increase.
          </p>
          <p>
            However, getting older is <strong>not a sentence of inevitable decline.</strong> It is an unprecedented opportunity. Adults who adopt progressive strength training, protein-forward nutrition practices, and strategic recovery protocols can dramatically reduce their risk of metabolic disease, bone loss, frailty, and functional decline. 
          </p>
          <p>
            The Strength for Life Framework is built on the premise that lifelong vitality is the result of interconnected physiological systems, not isolated behaviors. You cannot optimize one pillar while neglecting the others. Sustainable strength requires a systems-based approach.
          </p>
        </div>
      </section>

      {graphics.map((graphic) => (
        <section key={graphic.id} className={styles.graphicCard}>
          <h2 className={styles.graphicTitle}>{graphic.title}</h2>
          <div className={styles.imageWrapper}>
            <img 
              src={graphic.src} 
              alt={graphic.alt} 
              className={styles.frameworkImage}
            />
          </div>
          <div className={styles.graphicContent}>
            {graphic.content}
          </div>
        </section>
      ))}
    </div>
  );
}
