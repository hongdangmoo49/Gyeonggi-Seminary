import type { PostListProps } from '../../types';
import EmptyState from './EmptyState';
import styles from './PostList.module.css';

export default function PostList({ posts, onSelect, totalPosts }: PostListProps) {
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.colNum}>번호</span>
        <span className={styles.colTitle}>제목</span>
        <span className={styles.colAuthor}>작성자</span>
        <span className={styles.colDate}>날짜</span>
        <span className={styles.colViews}>조회</span>
      </div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`${styles.row} ${post.isNotice ? styles.notice : ''}`}
          onClick={() => onSelect(String(post.id))}
        >
          <span className={styles.colNum}>
            {post.isNotice ? '공지' : (totalPosts ?? posts.length) - index}
          </span>
          <span className={styles.colTitle}>
            {post.title}
            {post.comments?.length > 0 && (
              <span className={styles.commentCount}>[{post.comments.length}]</span>
            )}
          </span>
          <span className={styles.colAuthor}>{post.author}</span>
          <span className={styles.colDate}>{post.date}</span>
          <span className={styles.colViews}>{post.views}</span>
        </div>
      ))}
      {posts.length === 0 && (
        <EmptyState
          icon="📭"
          title="게시글이 없습니다"
          description="첫 번째 글을 작성해보세요."
        />
      )}
    </div>
  );
}
