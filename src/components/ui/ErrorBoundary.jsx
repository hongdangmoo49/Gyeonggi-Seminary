import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.page}>
          <div className={styles.content}>
            <span className={styles.icon}>⚠️</span>
            <h1 className={styles.title}>오류가 발생했습니다</h1>
            <p className={styles.desc}>페이지를 불러오는 중 문제가 발생했습니다.</p>
            <button
              className={styles.retryBtn}
              onClick={() => this.setState({ hasError: false })}
            >
              다시 시도
            </button>
            <a href="/Gyeonggi-Seminary/" className={styles.homeLink}>
              홈으로 돌아가기
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
