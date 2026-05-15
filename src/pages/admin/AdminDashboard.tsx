import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { MdPeople, MdArticle, MdVideoLibrary, MdDescription } from 'react-icons/md';
import styles from './AdminDashboard.module.css';

interface Stats {
  users: number;
  posts: number;
  videos: number;
  documents: number;
}

interface RecentPost {
  id: string;
  title?: string;
  author?: string;
  board?: string;
  createdAt?: { toDate?: () => Date };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, videos: 0, documents: 0 });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const [usersSnap, postsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'posts')),
      ]);

      setStats({
        users: usersSnap.size,
        posts: postsSnap.size,
        videos: 12,
        documents: 12,
      });

      const posts = postsSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.createdAt?.toDate?.()?.getTime() || 0;
          const tb = b.createdAt?.toDate?.()?.getTime() || 0;
          return tb - ta;
        })
        .slice(0, 5);

      setRecentPosts(posts as RecentPost[]);
    }
    fetchStats();
  }, []);

  const CARDS = [
    { icon: MdPeople, label: '회원', value: stats.users, color: '#2C5F8A' },
    { icon: MdArticle, label: '게시글', value: stats.posts, color: '#6B2D3E' },
    { icon: MdVideoLibrary, label: '동영상', value: stats.videos, color: '#C8A96E' },
    { icon: MdDescription, label: '문서', value: stats.documents, color: '#2E7D32' },
  ];

  return (
    <div>
      <h1 className={styles.title}>대시보드</h1>

      <div className={styles.grid}>
        {CARDS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={styles.card}>
            <div className={styles.cardIcon} style={{ background: color }}>
              <Icon size={28} />
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardValue}>{value}</span>
              <span className={styles.cardLabel}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>최근 게시글</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>게시판</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.board}</td>
                <td>{post.createdAt?.toDate?.().toLocaleDateString('ko-KR') || '-'}</td>
              </tr>
            ))}
            {recentPosts.length === 0 && (
              <tr><td colSpan={4} className={styles.empty}>게시글이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
