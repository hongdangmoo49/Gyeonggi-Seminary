import { useState } from 'react';
import styles from './Tab.module.css';

export default function Tab({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.tab}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === activeIndex}
            className={`${styles.tabButton} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabPanel} role="tabpanel">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
