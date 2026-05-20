import { useState, useEffect } from 'react';
import { MdCreate } from 'react-icons/md';
import useAuth from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import { useConfirm } from '../hooks/useConfirm';
import { toast } from '../hooks/useToast';
import PageBanner from '../components/ui/PageBanner';
import PostList from '../components/ui/PostList';
import PostDetail from '../components/ui/PostDetail';
import PostForm from '../components/ui/PostForm';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import { SkeletonList } from '../components/ui/Skeleton';
import useDebounce from '../hooks/useDebounce';
import type { Post } from '../types';
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
  const {
    posts,
    loading,
    page,
    setPage,
    addPost,
    updatePost,
    deletePost,
    incrementViews,
    addComment,
  } = usePosts(activeTab);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'list' | 'detail' | 'write' | 'edit'>('list');
  const [editPost, setEditPost] = useState<Post | null>(null);
  const { confirm, dialog } = useConfirm();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, setPage]);

  const filtered = debouncedSearch
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.content.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : posts;

  const PER_PAGE = 5;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pagedList = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const selectedPost = selectedId ? posts.find((p) => p.id === selectedId) : null;

  const handleWrite = async ({ title, content }: { title: string; content: string }) => {
    await addPost({
      title,
      content,
      author: user?.name || user?.email || '익명',
      authorUid: user?.uid || '',
      board: activeTab,
      isNotice: activeTab === 'notice' || activeTab === 'academic',
    });
    toast.success('게시글이 등록되었습니다.');
    setMode('list');
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
    setMode('edit');
  };

  const handleEditSubmit = async ({ title, content }: { title: string; content: string }) => {
    await updatePost(String(editPost!.id), { title, content });
    toast.success('게시글이 수정되었습니다.');
    setEditPost(null);
    setMode('list');
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm('정말 삭제하시겠습니까?');
    if (!ok) return;
    await deletePost(id);
    toast.success('게시글이 삭제되었습니다.');
    setSelectedId(null);
    setMode('list');
  };

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setMode('detail');
    await incrementViews(id);
  };

  const canWrite = user && (
    activeTab === 'prayer' ||
    activeTab === 'books' ||
    activeTab === 'alumni' ||
    user.isAdmin
  );

  if (loading) {
    return (
      <>
        <PageBanner title="커뮤니티" en="Community" />
        <section className="section">
          <div className="container">
            <SkeletonList rows={5} />
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
          {mode === 'write' && (
            <PostForm onSubmit={handleWrite} onBack={() => setMode('list')} />
          )}

          {mode === 'edit' && editPost && (
            <PostForm initialData={editPost} onSubmit={handleEditSubmit} onBack={() => { setEditPost(null); setMode('list'); }} />
          )}

          {mode === 'detail' && selectedPost && (
            <PostDetail
              post={selectedPost}
              onBack={() => { setSelectedId(null); setMode('list'); }}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddComment={addComment}
            />
          )}

          {mode === 'list' && (
            <>
              <div className={styles.tabs}>
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`${styles.tabBtn} ${activeTab === tab.key ? styles.active : ''}`}
                    onClick={() => { setActiveTab(tab.key); setMode('list'); setSelectedId(null); setSearch(''); setPage(1); }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={styles.toolbar}>
                <SearchBar value={search} onChange={setSearch} placeholder="제목 또는 내용으로 검색" />
                {canWrite && (
                  <button className={styles.writeBtn} onClick={() => setMode('write')}>
                    <MdCreate /> 글쓰기
                  </button>
                )}
              </div>
              <PostList posts={pagedList} onSelect={handleSelect} totalPosts={filtered.length} />
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
      {dialog}
    </>
  );
}
