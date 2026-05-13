import { Link } from 'react-router-dom';
import {
  MdSchool,
  MdMenuBook,
  MdAutoStories,
  MdPlayCircle,
  MdFolderOpen,
  MdForum,
  MdChurch,
  MdChevronRight,
} from 'react-icons/md';
import Card from '../components/ui/Card';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroSub}>대한예수교장로회 경기총회</p>
          <h1 className={styles.heroTitle}>
            경기신학교에 오신 것을<br />환영합니다
          </h1>
          <p className={styles.heroDesc}>
            평신도를 위한 체계적인 신학교육 — 성경중심, 신앙과 학문의 조화, 실천적 신학
          </p>
          <div className={styles.heroCta}>
            <Link to="/admission" className={styles.btnPrimary}>입학안내</Link>
            <Link to="/undergraduate" className={styles.btnOutline}>강의실 입장</Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">빠른 이동</h2>
          <div className={styles.quickGrid}>
            <Card to="/admission" icon={MdSchool} title="입학안내" description="입학 자격, 일정, 제출 서류 안내" />
            <Card to="/undergraduate" icon={MdMenuBook} title="학부강의실" description="평신도 기초 신학교육 과정" />
            <Card to="/video-library" icon={MdPlayCircle} title="동영상자료실" description="강의 영상, 특강, 예배 영상" />
            <Card to="/community" icon={MdForum} title="커뮤니티" description="공지사항, 기도제목, 동문소식" />
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className={`${styles.aboutSection} section`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>경기신학교 소개</h2>
              <p>
                경기신학교는 대한예수교장로회 경기총회 산하 평신도 신학교육기관으로,
                예수 그리스도의 복음을 바탕으로 한 체계적인 신학교육을 제공합니다.
              </p>
              <p>
                성경중심의 교육과정을 통해 교회와 사회에서 헌신할 수 있는
                평신도 지도자를 양성합니다.
              </p>
              <Link to="/about" className={styles.moreLink}>
                자세히 보기 <MdChevronRight />
              </Link>
            </div>
            <div className={styles.aboutValues}>
              <div className={styles.valueItem}>
                <strong>성경중심</strong>
                <span>모든 교육과정은 성경말씀을 중심으로 설계</span>
              </div>
              <div className={styles.valueItem}>
                <strong>신앙과 학문의 조화</strong>
                <span>경건한 신앙과 학문적 탁월함을 함께 추구</span>
              </div>
              <div className={styles.valueItem}>
                <strong>평신도 양성</strong>
                <span>교회와 사회에서 활동하는 평신도 지도자 양성</span>
              </div>
              <div className={styles.valueItem}>
                <strong>실천적 신학</strong>
                <span>이론에 그치지 않고 현장에서 실천할 수 있는 신학</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecture Shortcuts */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">강의실 바로가기</h2>
          <div className={styles.lectureGrid}>
            <Link to="/undergraduate" className={styles.lectureCard}>
              <MdMenuBook className={styles.lectureIcon} />
              <h3>학부 과정</h3>
              <p>구약, 신약, 신학, 교회사, 실천신학 등 기초 신학 과목</p>
              <span className={styles.lectureLink}>
                입장하기 <MdChevronRight />
              </span>
            </Link>
            <Link to="/graduate" className={styles.lectureCard}>
              <MdAutoStories className={styles.lectureIcon} />
              <h3>신대원 및 연구원</h3>
              <p>심화 성경학, 심화 신학, 연구원 논문 과정</p>
              <span className={styles.lectureLink}>
                입장하기 <MdChevronRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources & Community */}
      <section className={`${styles.resourcesSection} section`}>
        <div className="container">
          <h2 className="section-title">자료실 & 커뮤니티</h2>
          <div className={styles.quickGrid}>
            <Card to="/video-library" icon={MdPlayCircle} title="동영상자료실" description="강의 영상, 특강, 예배 영상 시청" />
            <Card to="/document-library" icon={MdFolderOpen} title="일반자료실" description="강의자료, 서식, 학술 자료 다운로드" />
            <Card to="/community" icon={MdForum} title="커뮤니티" description="공지사항, 기도제목 나눔, 동문 소식" />
            <Card to="/assembly" icon={MdChurch} title="경기총회" description="대한예수교장로회 경기총회 소개" />
          </div>
        </div>
      </section>
    </div>
  );
}
