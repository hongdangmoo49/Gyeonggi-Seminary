import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MdSearch, MdDelete, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import type { BoardKey } from '../../types';
import styles from './AdminPosts.module.css';

const BOARD_LABELS: Record<BoardKey, string> = {
  free: '자유게시판',
  notice: '공지사항',
  academic: '학사공지',
  prayer: '기도제목',
  books: '중고도서',
  alumni: '동문소식',
};

interface PostData {
  id: string;
  title?: string;
  author?: string;
  board?: BoardKey;
  isNotice?: boolean;
  views?: number;
  comments?: unknown[];
  createdAt?: { toDate?: () => Date };
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [search, setSearch] = useState('');
  const [boardFilter, setBoardFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const snap = await getDocs(collection(db, 'posts'));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PostData));
      list.sort((a, b) => {
        const ta = a.createdAt?.toDate?.()?.getTime() || 0;
        const tb = b.createdAt?.toDate?.()?.getTime() || 0;
        return tb - ta;
      });
      setPosts(list);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await deleteDoc(doc(db, 'posts', postId));
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const toggleNotice = async (postId: string, current: boolean) => {
    await updateDoc(doc(db, 'posts', postId), { isNotice: !current });
    setPosts(posts.map((p) => p.id === postId ? { ...p, isNotice: !current } : p));
  };

  const filtered = posts.filter((p) => {
    const matchBoard = boardFilter === 'all' || p.board === boardFilter;
    const matchSearch = !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.author?.toLowerCase().includes(search.toLowerCase());
    return matchBoard && matchSearch;
  });

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div>
      <h1 className={styles.title}>게시글 관리</h1>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            placeholder="제목 또는 작성자로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.select}
          value={boardFilter}
          onChange={(e) => setBoardFilter(e.target.value)}
        >
          <option value="all">전체 게시판</option>
          {Object.entries(BOARD_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <span className={styles.count}>총 {filtered.length}개</span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>게시판</th>
            <th>공지</th>
            <th>조회</th>
            <th>댓글</th>
            <th>날짜</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td className={styles.postTitle}>{p.title}</td>
              <td>{p.author}</td>
              <td>{BOARD_LABELS[p.board as BoardKey] || p.board}</td>
              <td>
                <button
                  className={`${styles.toggleBtn} ${p.isNotice ? styles.active : ''}`}
                  onClick={() => toggleNotice(p.id, !!p.isNotice)}
                >
                  {p.isNotice ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                </button>
              </td>
              <td>{p.views || 0}</td>
              <td>{p.comments?.length || 0}</td>
              <td>{p.createdAt?.toDate?.().toLocaleDateString('ko-KR') || '-'}</td>
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>
                  <MdDelete size={18} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={8} className={styles.empty}>게시글이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
