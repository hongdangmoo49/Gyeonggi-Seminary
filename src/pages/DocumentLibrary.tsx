import { useState } from 'react';
import type { ComponentType } from 'react';
import {
  MdFileDownload,
  MdPictureAsPdf,
  MdSlideshow,
} from 'react-icons/md';
import PageBanner from '../components/ui/PageBanner';
import FilterTabs from '../components/ui/FilterTabs';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import documents from '../data/documents';
import styles from './DocumentLibrary.module.css';

const CATEGORIES = ['전체', '강의자료', '서식', '학사안내', '학술자료'];
const PER_PAGE = 6;

const FILE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  PDF: MdPictureAsPdf,
  PPTX: MdSlideshow,
};

export default function DocumentLibrary() {
  const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = documents.filter((d) => {
    const matchCat = category === '전체' || d.category === category;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageBanner title="일반자료실" subtitle="강의자료, 서식, 학술 자료" en="Document Library" />
      <section className="section">
        <div className="container">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="자료명으로 검색" />
          <FilterTabs categories={CATEGORIES} active={category} onChange={(c) => { setCategory(c); setPage(1); }} />

          <div className={styles.grid}>
            {paged.map((doc) => {
              const FileIcon = FILE_ICONS[doc.fileType] || MdPictureAsPdf;
              return (
                <div key={doc.id} className={styles.card}>
                  <div className={styles.iconArea}>
                    <FileIcon className={styles.fileIcon} />
                    <span className={styles.fileType}>{doc.fileType}</span>
                  </div>
                  <div className={styles.body}>
                    <span className={styles.badge}>{doc.category}</span>
                    <h3 className={styles.title}>{doc.title}</h3>
                    <div className={styles.meta}>
                      <span>{doc.size}</span>
                      <span>{doc.date}</span>
                      <span>다운로드 {doc.downloads}</span>
                    </div>
                  </div>
                  <button className={styles.download} aria-label="다운로드">
                    <MdFileDownload />
                  </button>
                </div>
              );
            })}
          </div>

          {paged.length === 0 && (
            <p className={styles.empty}>검색 결과가 없습니다.</p>
          )}

          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </section>
    </>
  );
}
