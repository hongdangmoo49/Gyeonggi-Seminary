import styles from './AdminPlaceholder.module.css';

export default function AdminVideos() {
  return (
    <div>
      <h1 className={styles.title}>동영상 관리</h1>
      <div className={styles.placeholder}>
        <p>Firebase Storage 연동 후 동영상 업로드 기능이 활성화됩니다.</p>
        <p>관리자만 업로드 가능합니다.</p>
      </div>
    </div>
  );
}
