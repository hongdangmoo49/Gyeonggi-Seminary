import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import styles from './LoginModal.module.css';

export default function LoginModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          onClose();
        } else {
          setError(result.message);
        }
      } else {
        if (!name.trim()) {
          setError('이름을 입력해주세요.');
          return;
        }
        if (password.length < 6) {
          setError('비밀번호는 6자 이상이어야 합니다.');
          return;
        }
        const result = await register(email, password, name);
        if (result.success) {
          onClose();
        } else {
          setError(result.message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <MdClose />
        </button>

        <h2 className={styles.title}>
          {mode === 'login' ? '로그인' : '회원가입'}
        </h2>
        <p className={styles.subtitle}>경기신학교 홈페이지</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          )}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder={mode === 'register' ? '비밀번호 (6자 이상)' : '비밀번호'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            minLength={6}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <p className={styles.switch}>
          {mode === 'login' ? (
            <>계정이 없으신가요? <button onClick={switchMode}>회원가입</button></>
          ) : (
            <>이미 계정이 있으신가요? <button onClick={switchMode}>로그인</button></>
          )}
        </p>
      </div>
    </div>
  );
}
