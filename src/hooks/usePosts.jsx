import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const PER_PAGE = 5;

export default function usePosts(boardKey) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const postsRef = collection(db, 'posts');

  useEffect(() => {
    if (!boardKey) return;

    setLoading(true);
    const q = query(
      postsRef,
      where('board', '==', boardKey)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
          date: d.data().createdAt?.toDate?.().toISOString().slice(0, 10).replace(/-/g, '.') || '',
        }))
        .sort((a, b) => {
          if (a.isNotice !== b.isNotice) return a.isNotice ? -1 : 1;
          const ta = a.createdAt?.toDate?.() || 0;
          const tb = b.createdAt?.toDate?.() || 0;
          return tb - ta;
        });
      setPosts(list);
      setLoading(false);
    }, (err) => {
      console.error('Firestore snapshot error:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [boardKey]);

  const addPost = useCallback(async ({ title, author, content, board, isNotice }) => {
    await addDoc(postsRef, {
      title,
      author,
      content,
      board,
      isNotice: isNotice || false,
      views: 0,
      comments: [],
      createdAt: serverTimestamp(),
    });
  }, []);

  const updatePost = useCallback(async (postId, data) => {
    const ref = doc(db, 'posts', postId);
    await updateDoc(ref, data);
  }, []);

  const deletePost = useCallback(async (postId) => {
    const ref = doc(db, 'posts', postId);
    await deleteDoc(ref);
  }, []);

  const incrementViews = useCallback(async (postId) => {
    const ref = doc(db, 'posts', postId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { views: (snap.data().views || 0) + 1 });
    }
  }, []);

  const addComment = useCallback(async (postId, { author, content }) => {
    const ref = doc(db, 'posts', postId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const existing = snap.data().comments || [];
      const newComment = {
        id: crypto.randomUUID(),
        author,
        content,
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      };
      await updateDoc(ref, { comments: [...existing, newComment] });
    }
  }, []);

  const filtered = posts;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return {
    posts: filtered,
    paged,
    loading,
    page,
    setPage,
    totalPages,
    addPost,
    updatePost,
    deletePost,
    incrementViews,
    addComment,
  };
}
