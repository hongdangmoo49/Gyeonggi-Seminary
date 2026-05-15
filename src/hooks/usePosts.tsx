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
import type { Post, UsePostsReturn } from '../types';

const PER_PAGE = 5;

export default function usePosts(boardKey: string): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const postsRef = collection(db, 'posts');

  useEffect(() => {
    if (!boardKey) return;

    setLoading(true);
    const q = query(postsRef, where('board', '==', boardKey));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Post[] = snapshot.docs
        .map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...(data as Omit<Post, 'id'>),
            date: data.createdAt?.toDate?.().toISOString().slice(0, 10).replace(/-/g, '.') || '',
          } as Post;
        })
        .sort((a, b) => {
          if (a.isNotice !== b.isNotice) return a.isNotice ? -1 : 1;
          const ta = a.createdAt ? new Date(a.createdAt as unknown as number).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt as unknown as number).getTime() : 0;
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

  const addPost = useCallback(async (data: {
    title: string;
    content: string;
    author: string;
    authorUid: string;
    board: string;
    isNotice?: boolean;
  }) => {
    await addDoc(postsRef, {
      title: data.title,
      author: data.author,
      authorUid: data.authorUid || '',
      content: data.content,
      board: data.board,
      isNotice: data.isNotice || false,
      views: 0,
      comments: [],
      createdAt: serverTimestamp(),
    });
  }, []);

  const updatePost = useCallback(async (postId: string, data: Partial<Post>) => {
    const ref = doc(db, 'posts', postId);
    await updateDoc(ref, data);
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    const ref = doc(db, 'posts', postId);
    await deleteDoc(ref);
  }, []);

  const incrementViews = useCallback(async (postId: string) => {
    const ref = doc(db, 'posts', postId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { views: (snap.data().views || 0) + 1 });
    }
  }, []);

  const addComment = useCallback(async (postId: string, { author, content }: { author: string; content: string }) => {
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
    totalPosts: filtered.length,
    addPost,
    updatePost,
    deletePost,
    incrementViews,
    addComment,
  };
}
