import styles from './Skeleton.module.css';

export function SkeletonRow() {
  return (
    <div className={styles.row}>
      <div className={`${styles.skeleton} ${styles.num}`} />
      <div className={`${styles.skeleton} ${styles.title}`} />
      <div className={`${styles.skeleton} ${styles.meta}`} />
      <div className={`${styles.skeleton} ${styles.meta}`} />
      <div className={`${styles.skeleton} ${styles.meta}`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.cardTitle}`} />
      <div className={`${styles.skeleton} ${styles.cardLine}`} />
      <div className={`${styles.skeleton} ${styles.cardLine}`} />
      <div className={`${styles.skeleton} ${styles.cardLine}`} />
    </div>
  );
}

export function SkeletonList({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }, (_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
