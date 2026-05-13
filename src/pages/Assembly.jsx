import PageBanner from '../components/ui/PageBanner';
import styles from './Assembly.module.css';

export default function Assembly() {
  return (
    <>
      <PageBanner title="경기총회" subtitle="대한예수교장로회 경기총회" en="Gyeonggi General Assembly" />
      <section className="section">
        <div className="container">
          {/* 소개 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>경기총회 소개</h2>
            <p className={styles.intro}>
              대한예수교장로회 경기총회는 경기도 지역 예수교장로회 교회들의 연합 기관으로,
              복음 전파와 교회 연합을 위해 설립된 총회입니다.
              경기신학교는 경기총회의 산하 기관으로서, 총회의 비전과 방향에 따라 평신도 신학교육을 실시하고 있습니다.
            </p>
          </div>

          {/* 비전 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>총회 비전</h2>
            <div className={styles.visionGrid}>
              {[
                { num: '01', title: '복음 전파', desc: '경기도 지역에 예수 그리스도의 복음을 전파합니다.' },
                { num: '02', title: '교회 연합', desc: '산하 교회들의 연합과 협력을 도모합니다.' },
                { num: '03', title: '지도자 양성', desc: '평신도 및 목회자 지도자를 양성합니다.' },
                { num: '04', title: '사회 봉사', desc: '지역 사회를 위한 봉사와 구제 활동을 전개합니다.' },
              ].map((v) => (
                <div key={v.num} className={styles.visionCard}>
                  <span className={styles.visionNum}>{v.num}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 조직 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>총회 조직</h2>
            <h3 className={styles.subTitle}>총회 임원</h3>
            <table className={styles.table}>
              <thead>
                <tr><th>직책</th><th>역할</th></tr>
              </thead>
              <tbody>
                <tr><td>총회장</td><td>총회를 대표하고 총회 업무를 총괄</td></tr>
                <tr><td>부총회장</td><td>총회장을 보좌하고 총회장 유고 시 직무 대행</td></tr>
                <tr><td>총무</td><td>총회 사무행정을 총괄</td></tr>
                <tr><td>서기</td><td>총회 기록 및 문서 관리</td></tr>
                <tr><td>회계</td><td>총회 재정 관리</td></tr>
              </tbody>
            </table>

            <h3 className={styles.subTitle}>산하 위원회</h3>
            <table className={styles.table}>
              <thead>
                <tr><th>위원회</th><th>역할</th></tr>
              </thead>
              <tbody>
                <tr><td>신학교육위원회</td><td>경기신학교 운영 및 교육 정책 수립</td></tr>
                <tr><td>선교위원회</td><td>국내외 선교 사업 기획 및 실행</td></tr>
                <tr><td>교육위원회</td><td>산하 교회 교육 지원</td></tr>
                <tr><td>봉사위원회</td><td>사회 봉사 및 구제 사업</td></tr>
                <tr><td>재정위원회</td><td>총회 재정 운영 및 감사</td></tr>
              </tbody>
            </table>
          </div>

          {/* 행사 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>주요 행사</h2>
            <table className={styles.table}>
              <thead>
                <tr><th>행사</th><th>시기</th><th>내용</th></tr>
              </thead>
              <tbody>
                <tr><td>정기총회</td><td>연 1회</td><td>총회 결산 및 계획 수립</td></tr>
                <tr><td>연합 수련회</td><td>연 1회</td><td>산하 교회 연합 친교 수련회</td></tr>
                <tr><td>선교대회</td><td>연 1회</td><td>국내외 선교 비전 선포</td></tr>
                <tr><td>평신도 훈련</td><td>수시</td><td>평신도 지도자 훈련 프로그램</td></tr>
              </tbody>
            </table>
          </div>

          {/* 산하 기관 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>산하 기관</h2>
            <div className={styles.orgGrid}>
              <div className={styles.orgCard}>
                <h3>경기신학교</h3>
                <p>평신도 신학교육기관 — 학부, 신학대학원, 연구원 과정 운영</p>
              </div>
              <div className={styles.orgCard}>
                <h3>산하 교회</h3>
                <p>경기도 지역 대한예수교장로회 산하 교회</p>
              </div>
            </div>
          </div>

          {/* 말씀 */}
          <div className={styles.scripture}>
            <p className={styles.scriptureText}>
              "만군의 여호와가 말하노라 너희는 열방 중에서 나를 사랑하는 자를 데려오며
              나를 위하여 제사장으로 삼으리라"
            </p>
            <span className={styles.scriptureRef}>— 말라기 3:12 (참조)</span>
          </div>
        </div>
      </section>
    </>
  );
}
