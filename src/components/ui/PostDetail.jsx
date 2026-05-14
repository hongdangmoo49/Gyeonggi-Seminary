import { useState } from 'react';
import { MdArrowBack, MdEdit, MdDelete } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { validateInput } from '../../utils/validation';
import Comment from './Comment';
import styles from './PostDetail.module.css';

export default function PostDetail({ post, onBack, onEdit, onDelete, onAddComment }) {
  const { user } = useAuth();
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');

  if (!post) return null;

  const isAdmin = user?.isAdmin;
  const isAuthor = user?.uid === post.authorUid;
  const canEdit = isAdmin || isAuthor;
  const canDelete = isAdmin;

  const handleAddComment = () => {
    setCommentError('');
    const error = validateInput(commentContent, { min: 1, max: 500, label: '댓글' });
    if (error) { setCommentError(error); return; }
    onAddComment(post.id, { author: user.name || user.email, content: commentContent.trim() });
    setCommentContent('');
  };

  return (
    <div className={styles.detail}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <MdArrowBack /> 목록
        </button>
        <div className={styles.actions}>
          {canEdit && onEdit && (
            <button className={styles.editBtn} onClick={() => onEdit(post)}>
              <MdEdit /> 수정
            </button>
          )}
          {canDelete && onDelete && (
            <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
              <MdDelete /> 삭제
            </button>
          )}
        </div>
      </div>

      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.meta}>
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>조회 {post.views}</span>
      </div>

      <div className={styles.content}>
        {post.content.split('\n').map((line, i) => (
          <p key={i}>{line || ' '}</p>
        ))}
      </div>

      <div className={styles.commentSection}>
        <h3>댓글 ({post.comments?.length || 0})</h3>
        {post.comments?.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
        {user && onAddComment && (
          <div className={styles.commentForm}>
            <div className={styles.commentRow}>
              <input
                type="text"
                placeholder="댓글을 입력하세요 (최대 500자)"
                value={commentContent}
                onChange={(e) => { setCommentContent(e.target.value); setCommentError(''); }}
                className={styles.commentInput}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                maxLength={500}
              />
              <button className={styles.commentSubmit} onClick={handleAddComment}>
                등록
              </button>
            </div>
            {commentError && <p className={styles.commentError}>{commentError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
