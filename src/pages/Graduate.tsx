import { useState } from 'react';
import PageBanner from '../components/ui/PageBanner';
import Tab from '../components/ui/Tab';
import FilterTabs from '../components/ui/FilterTabs';
import { graduateLectures, researchLectures } from '../data/lectures';
import type { Lecture } from '../types';
import styles from './Graduate.module.css';

const GRAD_CATEGORIES = ['전체', '심화 성경학', '심화 신학', '심화 실천신학'];

interface LectureTableProps {
  lectures: Lecture[];
}

function LectureTable({ lectures }: LectureTableProps) {
  const [category, setCategory] = useState('전체');

  const filtered = category === '전체'
    ? lectures
    : lectures.filter((l) => l.category === category);

  return (
    <>
      <FilterTabs categories={GRAD_CATEGORIES} active={category} onChange={setCategory} />

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
                <td><span className={styles.badge}>{lec.category}</span></td>
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

      <div className={styles.cardList}>
        {filtered.map((lec) => (
          <div key={lec.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{lec.category}</span>
              <span className={styles.cardCredits}>{lec.credits}학점</span>
            </div>
            <h3>{lec.name}</h3>
            <p>{lec.description}</p>
            <div className={styles.cardMeta}>
              <span>{lec.professor}</span>
              <span>{lec.semester}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className={styles.empty}>해당 분야의 강의가 없습니다.</p>}
    </>
  );
}

function ResearchSection() {
  return (
    <div>
      <p className={styles.researchIntro}>
        연구원 과정은 신대원 과정 이수자를 대상으로 한 최고 수준의 신학연구 과정입니다.
        지도교수와의 1:1 연구 지도를 통해 학위 논문을 작성합니다.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>과목명</th><th>교수</th><th>학기</th><th>학점</th><th>비고</th></tr></thead>
          <tbody>
            {researchLectures.map((lec) => (
              <tr key={lec.id}>
                <td className={styles.lecName}>{lec.name}</td>
                <td>{lec.professor}</td>
                <td>{lec.semester}</td>
                <td>{lec.credits}</td>
                <td className={styles.lecDesc}>{lec.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.cardList}>
        {researchLectures.map((lec) => (
          <div key={lec.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{lec.name}</h3>
              <span className={styles.cardCredits}>{lec.credits}학점</span>
            </div>
            <p>{lec.description}</p>
            <div className={styles.cardMeta}>
              <span>{lec.professor}</span>
              <span>{lec.semester}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Graduate() {
  const tabs = [
    { label: '신학대학원', content: <LectureTable lectures={graduateLectures} /> },
    { label: '연구원', content: <ResearchSection /> },
  ];

  return (
    <>
      <PageBanner title="신대원 및 연구원 강의실" subtitle="심화 신학교육 · 연구 과정" en="Graduate & Research" />
      <section className="section">
        <div className="container">
          <Tab tabs={tabs} />
        </div>
      </section>
    </>
  );
}
