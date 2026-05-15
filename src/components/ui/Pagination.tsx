import type { PaginationProps } from '../../types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './Pagination.module.css';

export default function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;

  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="이전"
      >
        <MdChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${current === page ? styles.active : ''}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.arrow}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="다음"
      >
        <MdChevronRight />
      </button>
    </div>
  );
}
