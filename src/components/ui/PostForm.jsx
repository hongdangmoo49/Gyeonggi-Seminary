import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import styles from './PostForm.module.css';

export default function PostForm({ initialData, onSubmit, onBack }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) return;
    onSubmit({ title, author, content });
  };

  return (
    <div className={styles.form}>
      <button className={styles.backBtn} onClick={onBack}>
        <MdArrowBack /> 목록
      </button>

      <h2 className={styles.formTitle}>{initialData ? '글 수정' : '글쓰기'}</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.row}>
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            rows={12}
            required
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onBack}>취소</button>
          <button type="submit" className={styles.submitBtn}>
            {initialData ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
