import { useState } from 'react';
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
import type { Post } from '../types';
import styles from './Board.module.css';

export default function Board() {
  const { posts, paged, loading, page, setPage, totalPages, totalPosts, addPost, updatePost, deletePost, incrementViews, addComment } = usePosts('free');
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'list' | 'detail' | 'write' | 'edit'>('list');
  const [editPost, setEditPost] = useState<Post | null>(null);
  const { confirm, dialog } = useConfirm();

  const filtered = search
    ? paged.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
      )
    : paged;

  const selectedPost = selectedId ? posts.find((p) => p.id === selectedId) : null;

  const handleWrite = async ({ title, content }: { title: string; content: string }) => {
    await addPost({
      title,
      content,
      author: user?.name || user?.email || '익명',
      authorUid: user?.uid || '',
      board: 'free',
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

  if (loading) {
    return (
      <>
        <PageBanner title="자유게시판" en="Free Board" />
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
      <PageBanner title="자유게시판" en="Free Board" />
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
              <div className={styles.toolbar}>
                <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="제목 또는 내용으로 검색" />
                {user && (
                  <button className={styles.writeBtn} onClick={() => setMode('write')}>
                    <MdCreate /> 글쓰기
                  </button>
                )}
              </div>
              <PostList posts={filtered} onSelect={handleSelect} totalPosts={totalPosts} />
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
      {dialog}
    </>
  );
}
