import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import styles from './LoginModal.module.css';

export default function LoginModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // login | register | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      if (mode === 'reset') {
        try {
          await sendPasswordResetEmail(auth, email);
          setMessage('비밀번호 재설정 이메일을 발송했습니다. 이메일을 확인해주세요.');
        } catch (err) {
          const messages = {
            'auth/user-not-found': '해당 이메일로 가입된 계정이 없습니다.',
            'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
          };
          setError(messages[err.code] || '이메일 발송에 실패했습니다.');
        }
        return;
      }

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

  const TITLES = { login: '로그인', register: '회원가입', reset: '비밀번호 찾기' };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <MdClose />
        </button>

        <h2 className={styles.title}>{TITLES[mode]}</h2>
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
          {mode !== 'reset' && (
            <input
              type="password"
              placeholder={mode === 'register' ? '비밀번호 (6자 이상)' : '비밀번호'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              minLength={6}
            />
          )}

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? '처리 중...' : TITLES[mode]}
          </button>
        </form>

        <div className={styles.links}>
          {mode === 'login' && (
            <>
              <button onClick={() => { setMode('reset'); setError(''); setMessage(''); }}>
                비밀번호 찾기
              </button>
              <span>|</span>
              <button onClick={() => { setMode('register'); setError(''); setMessage(''); }}>
                회원가입
              </button>
            </>
          )}
          {mode === 'register' && (
            <button onClick={() => { setMode('login'); setError(''); setMessage(''); }}>
              로그인으로 돌아가기
            </button>
          )}
          {mode === 'reset' && (
            <button onClick={() => { setMode('login'); setError(''); setMessage(''); }}>
              로그인으로 돌아가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
