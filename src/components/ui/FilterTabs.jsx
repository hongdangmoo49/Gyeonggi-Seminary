import styles from './FilterTabs.module.css';

export default function FilterTabs({ categories, active, onChange }) {
  return (
    <div className={styles.filter}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.button} ${active === cat ? styles.active : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
