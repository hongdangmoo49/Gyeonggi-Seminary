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
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Home.module.css';

export default function Home() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
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
      <section className="section" data-reveal>
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
      <section className={`${styles.aboutSection} section`} data-reveal>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>경기신학교 소개</h2>
              <p className={styles.aboutHighlight}>
                성경적 신학공부를 원하시는 분들은 이곳에서 함께 할 수 있습니다.
              </p>
              <p>
                경기신학교(평신도신학)에서 도움을 드리겠습니다.
                대한예수교장로회 신학석·박사인 교수진으로 하여 수업하고 있으며,
                초교파적으로 학생을 모집합니다. 신학을 하는 이곳에서 시작해 보세요.
              </p>
              <Link to="/about" className={styles.moreLink}>
                자세히 보기 <MdChevronRight />
              </Link>
            </div>
            <div className={styles.aboutValues}>
              <div className={styles.valueItem}>
                <strong>학부 + 대학원 과정</strong>
                <span>학부과정과 대학원과정 등을 진행합니다</span>
              </div>
              <div className={styles.valueItem}>
                <strong>일산본교 (토요일)</strong>
                <span>토요일 오전·오후 수업</span>
              </div>
              <div className={styles.valueItem}>
                <strong>서울 분교 (금요일)</strong>
                <span>금요일 오후 수업 — 편의성과 접근성 고려</span>
              </div>
              <div className={styles.valueItem}>
                <strong>직장인 맞춤형 수업료</strong>
                <span>직장인들을 위한 합리적인 수업료 구성</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecture Shortcuts */}
      <section className="section" data-reveal>
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
      <section className={`${styles.resourcesSection} section`} data-reveal>
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
