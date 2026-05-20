import { useState, useEffect } from 'react';
import { MdPlayCircle, MdAccessTime, MdPerson } from 'react-icons/md';
import PageBanner from '../components/ui/PageBanner';
import FilterTabs from '../components/ui/FilterTabs';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import useDebounce from '../hooks/useDebounce';
import videos from '../data/videos';
import styles from './VideoLibrary.module.css';

const CATEGORIES = ['전체', '학부강의', '특강', '예배'];
const PER_PAGE = 6;

export default function VideoLibrary() {
  const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const filtered = videos.filter((v) => {
    const matchCat = category === '전체' || v.category === category;
    const matchSearch = !debouncedSearch ||
      v.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      v.professor.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageBanner title="동영상자료실" subtitle="강의 영상, 특강, 예배 영상" en="Video Library" />
      <section className="section">
        <div className="container">
          <SearchBar value={search} onChange={setSearch} placeholder="강의명 또는 강사명으로 검색" />
          <FilterTabs categories={CATEGORIES} active={category} onChange={setCategory} />

          <div className={styles.grid}>
            {paged.map((video) => (
              <div key={video.id} className={styles.card}>
                <div className={styles.thumbnail}>
                  <MdPlayCircle className={styles.playIcon} />
                  <span className={styles.duration}>{video.duration}</span>
                </div>
                <div className={styles.body}>
                  <span className={styles.badge}>{video.category}</span>
                  <h3 className={styles.title}>{video.title}</h3>
                  <div className={styles.meta}>
                    <span><MdPerson /> {video.professor}</span>
                    <span><MdAccessTime /> {video.date}</span>
                  </div>
                </div>
              </div>
            ))}
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
