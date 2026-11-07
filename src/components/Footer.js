import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.disclaimer}>
          <strong>Medical Disclaimer:</strong> The Strength for Life System is for educational and informational purposes only and does not constitute medical advice. Consult your physician or healthcare provider before beginning this or any other fitness, nutrition, or health program, especially if you have pre-existing conditions. By participating, you assume all risks associated with the exercises and advice provided.
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Strength for Life. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
