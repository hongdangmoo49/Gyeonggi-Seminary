import type { FormEvent } from 'react';
import type { PostFormProps } from '../../types';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { validateInput } from '../../utils/validation';
import styles from './PostForm.module.css';

export default function PostForm({ initialData, onSubmit, onBack }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const titleError = validateInput(title, { min: 2, max: 100, label: '제목' });
    if (titleError) { setError(titleError); return; }

    const contentError = validateInput(content, { min: 5, max: 10000, label: '내용' });
    if (contentError) { setError(contentError); return; }

    onSubmit({ title: title.trim(), content: content.trim() });
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
            placeholder="제목 (2~100자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
            maxLength={100}
          />
        </div>
        <div className={styles.row}>
          <textarea
            placeholder="내용을 입력하세요 (5~10000자)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            rows={12}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
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
