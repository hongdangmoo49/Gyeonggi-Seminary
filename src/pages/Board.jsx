import { useState } from 'react';
import { MdCreate } from 'react-icons/md';
import PageBanner from '../components/ui/PageBanner';
import PostList from '../components/ui/PostList';
import PostDetail from '../components/ui/PostDetail';
import PostForm from '../components/ui/PostForm';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import initialPosts from '../data/posts';
import styles from './Board.module.css';

const PER_PAGE = 5;

export default function Board() {
  const [posts, setPosts] = useLocalStorage('board-posts', initialPosts.filter((p) => p.board === 'free'));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('list'); // list | detail | write | edit
  const [editPost, setEditPost] = useState(null);

  const freePosts = posts
    .filter((p) => {
      if (!search) return true;
      return p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(freePosts.length / PER_PAGE);
  const paged = freePosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const selectedPost = selectedId ? posts.find((p) => p.id === selectedId) : null;

  const handleWrite = ({ title, author, content }) => {
    const newPost = {
      id: Date.now(),
      board: 'free',
      title,
      author,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      views: 0,
      content,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setMode('list');
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setMode('edit');
  };

  const handleEditSubmit = ({ title, author, content }) => {
    setPosts(posts.map((p) =>
      p.id === editPost.id ? { ...p, title, author, content } : p
    ));
    setEditPost(null);
    setMode('list');
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    setSelectedId(null);
    setMode('list');
  };

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
              onEdit={(post) => handleEdit(post)}
              onDelete={(id) => handleDelete(id)}
              onAddComment={handleAddComment}
            />
          )}

          {mode === 'list' && (
            <>
              <div className={styles.toolbar}>
                <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="제목 또는 내용으로 검색" />
                <button className={styles.writeBtn} onClick={() => setMode('write')}>
                  <MdCreate /> 글쓰기
                </button>
              </div>
              <PostList
                posts={paged}
                onSelect={(id) => {
                  setSelectedId(id);
                  setMode('detail');
                  setPosts(posts.map((p) => p.id === id ? { ...p, views: p.views + 1 } : p));
                }}
              />
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
