import { MdArrowBack, MdEdit, MdDelete } from 'react-icons/md';
import Comment from './Comment';
import styles from './PostDetail.module.css';

export default function PostDetail({ post, onBack, onEdit, onDelete, onAddComment }) {
  if (!post) return null;

  return (
    <div className={styles.detail}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <MdArrowBack /> 목록
        </button>
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit(post)}>
            <MdEdit /> 수정
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
            <MdDelete /> 삭제
          </button>
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
        <div className={styles.commentForm}>
          <input
            type="text"
            placeholder="작성자"
            className={styles.commentInput}
            id="comment-author"
          />
          <div className={styles.commentRow}>
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              className={styles.commentInput}
              id="comment-content"
            />
            <button
              className={styles.commentSubmit}
              onClick={() => {
                const author = document.getElementById('comment-author').value.trim();
                const content = document.getElementById('comment-content').value.trim();
                if (author && content) {
                  onAddComment(post.id, { author, content });
                  document.getElementById('comment-author').value = '';
                  document.getElementById('comment-content').value = '';
                }
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
