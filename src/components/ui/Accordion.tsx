import type { AccordionProps } from '../../types';
import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import styles from './Accordion.module.css';

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <button
            className={`${styles.trigger} ${openIndex === i ? styles.open : ''}`}
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span className={styles.title}>{item.title}</span>
            <MdExpandMore className={styles.icon} />
          </button>
          <div className={`${styles.panel} ${openIndex === i ? styles.panelOpen : ''}`}>
            <div className={styles.content}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
