import type { CardProps } from '../../types';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ to, icon: Icon, title, description, className }: CardProps) {
  const Wrapper = to ? Link : 'div';
  return (
    <Wrapper to={to} className={`${styles.card} ${className || ''}`}>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon className={styles.icon} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
    </Wrapper>
  );
}
