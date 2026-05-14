import { useState } from 'react';
import PageBanner from '../components/ui/PageBanner';
import FilterTabs from '../components/ui/FilterTabs';
import { undergraduateLectures } from '../data/lectures';
import styles from './Undergraduate.module.css';

const CATEGORIES = ['전체', '구약성경', '신약성경', '신학', '교회사', '실천신학'];

export default function Undergraduate() {
  const [category, setCategory] = useState('전체');

  const filtered = category === '전체'
    ? undergraduateLectures
    : undergraduateLectures.filter((l) => l.category === category);

  return (
    <>
      <PageBanner title="학부강의실" subtitle="평신도 기초 신학교육 과정" en="Undergraduate Lectures" />
      <section className="section">
        <div className="container">
          <FilterTabs categories={CATEGORIES} active={category} onChange={setCategory} />

          {/* Desktop: Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>분야</th>
                  <th>과목명</th>
                  <th>교수</th>
                  <th>학기</th>
                  <th>학점</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lec) => (
                  <tr key={lec.id}>
                    <td><span className={styles.categoryBadge}>{lec.category}</span></td>
                    <td className={styles.lecName}>
                      {lec.name}
                      <span className={styles.lecDesc}>{lec.description}</span>
                    </td>
                    <td>{lec.professor}</td>
                    <td>{lec.semester}</td>
                    <td>{lec.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Cards */}
          <div className={styles.cardList}>
            {filtered.map((lec) => (
              <div key={lec.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{lec.category}</span>
                  <span className={styles.cardCredits}>{lec.credits}학점</span>
                </div>
                <h3 className={styles.cardName}>{lec.name}</h3>
                <p className={styles.cardDesc}>{lec.description}</p>
                <div className={styles.cardMeta}>
                  <span>{lec.professor}</span>
                  <span>{lec.semester}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>해당 분야의 강의가 없습니다.</p>
          )}
        </div>
      </section>
    </>
  );
}
