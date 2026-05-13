import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <span className={styles.logoKr}>경기신학교</span>
            <span className={styles.logoEn}>Gyeonggi Seminary</span>
          </div>
          <p className={styles.desc}>
            대한예수교장로회 경기총회 산하 평신도 신학교육기관
          </p>
          <p className={styles.address}>
            경기도 (상세 주소는 경기총회 사무실로 문의 바랍니다)
          </p>
        </div>

        <div className={styles.links}>
          <h4 className={styles.linksTitle}>바로가기</h4>
          <ul className={styles.linkList}>
            <li><Link to="/about">학교소개</Link></li>
            <li><Link to="/admission">입학안내</Link></li>
            <li><Link to="/undergraduate">학부강의실</Link></li>
            <li><Link to="/community">커뮤니티</Link></li>
            <li><Link to="/assembly">경기총회</Link></li>
          </ul>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} 경기신학교. 대한예수교장로회 경기총회</p>
          <p className={styles.copyrightEn}>
            Korean Presbyterian Pyungshindo Gyeonggi General Assembly
          </p>
        </div>
      </div>
    </footer>
  );
}
