import type { PageBannerProps } from '../../types';
import styles from './PageBanner.module.css';

export default function PageBanner({ title, subtitle, en }: PageBannerProps) {
  return (
    <section className={styles.banner}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {en && <p className={styles.en}>{en}</p>}
      </div>
    </section>
  );
}
