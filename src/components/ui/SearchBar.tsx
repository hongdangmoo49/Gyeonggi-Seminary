import type { SearchBarProps } from '../../types';
import { MdSearch } from 'react-icons/md';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = '검색어를 입력하세요' }: SearchBarProps) {
  return (
    <div className={styles.search}>
      <MdSearch className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
