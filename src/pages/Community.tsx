import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import PageBanner from '../components/ui/PageBanner';
import PostList from '../components/ui/PostList';
import PostDetail from '../components/ui/PostDetail';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import styles from './Community.module.css';

const TABS = [
  { key: 'notice', label: '공지사항' },
  { key: 'academic', label: '학사공지' },
  { key: 'prayer', label: '기도제목' },
  { key: 'books', label: '중고도서' },
  { key: 'alumni', label: '동문소식' },
];

export default function Community() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notice');
  const { posts, paged, loading, page, setPage, totalPages, totalPosts, deletePost, addComment } = usePosts(activeTab);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPost = selectedId ? posts.find((p) => p.id === selectedId) : null;

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    await deletePost(selectedId);
    setSelectedId(null);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  if (loading) {
    return (
      <>
        <PageBanner title="커뮤니티" en="Community" />
        <section className="section">
          <div className="container">
            <LoadingSpinner />
          </div>
        </section>
      </>
    );
  }

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
              onEdit={undefined}
              onDelete={handleDelete}
              onAddComment={addComment}
            />
          ) : (
            <>
              <PostList posts={paged} onSelect={handleSelect} totalPosts={totalPosts} />
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
