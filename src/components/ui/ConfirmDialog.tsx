import { useEffect } from 'react';
import useFocusTrap from '../../hooks/useFocusTrap';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  const trapRef = useFocusTrap(true);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel} role="alertdialog" aria-modal="true" aria-label="확인">
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()} ref={trapRef}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>취소</button>
          <button className={styles.confirmBtn} onClick={onConfirm} autoFocus>확인</button>
        </div>
      </div>
    </div>
  );
}
