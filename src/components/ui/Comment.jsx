import styles from './Comment.module.css';

export default function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <div className={styles.meta}>
        <strong>{comment.author}</strong>
        <span>{comment.date}</span>
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
