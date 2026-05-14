import { useState } from 'react';
import PageBanner from '../components/ui/PageBanner';
import PostList from '../components/ui/PostList';
import PostDetail from '../components/ui/PostDetail';
import Pagination from '../components/ui/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import initialPosts from '../data/posts';
import styles from './Community.module.css';

const TABS = [
  { key: 'notice', label: '공지사항' },
  { key: 'academic', label: '학사공지' },
  { key: 'prayer', label: '기도제목' },
  { key: 'books', label: '중고도서' },
  { key: 'alumni', label: '동문소식' },
];

const PER_PAGE = 5;

export default function Community() {
  const [posts, setPosts] = useLocalStorage('community-posts', initialPosts);
  const [activeTab, setActiveTab] = useState('notice');
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);

  const tabPosts = posts
    .filter((p) => p.board === activeTab)
    .sort((a, b) => (a.isNotice === b.isNotice ? b.id - a.id : a.isNotice ? -1 : 1));

  const totalPages = Math.ceil(tabPosts.length / PER_PAGE);
  const paged = tabPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const selectedPost = selectedId ? posts.find((p) => p.id === selectedId) : null;

  const handleAddComment = (postId, { author, content }) => {
    setPosts(posts.map((p) => {
      if (p.id !== postId) return p;
      const newComment = {
        id: (p.comments?.length || 0) + 1,
        author,
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
        content,
      };
      return { ...p, comments: [...(p.comments || []), newComment] };
    }));
  };

  return (
    <>
      <PageBanner title="커뮤니티" en="Community" />
      <section className="section">
        <div className="container">
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tabBtn} ${activeTab === tab.key ? styles.active : ''}`}
                onClick={() => { setActiveTab(tab.key); setSelectedId(null); setPage(1); }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {selectedPost ? (
            <PostDetail
              post={selectedPost}
              onBack={() => setSelectedId(null)}
              onEdit={() => {}}
              onDelete={() => {
                setPosts(posts.filter((p) => p.id !== selectedId));
                setSelectedId(null);
              }}
              onAddComment={handleAddComment}
            />
          ) : (
            <>
              <PostList posts={paged} onSelect={(id) => setSelectedId(id)} />
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
