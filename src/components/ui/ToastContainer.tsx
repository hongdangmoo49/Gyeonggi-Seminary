import { useToasts } from '../../hooks/useToast';
import styles from './Toast.module.css';

export default function ToastContainer() {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]} ${t.exiting ? styles.exiting : ''}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
