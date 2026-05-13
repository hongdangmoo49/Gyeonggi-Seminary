import PageBanner from '../components/ui/PageBanner';
import Tab from '../components/ui/Tab';
import styles from './About.module.css';

export default function About() {
  const tabs = [
    {
      label: '교육이념',
      content: (
        <div className={styles.tabContent}>
          <p className={styles.intro}>
            경기신학교는 다음의 교육이념을 바탕으로 운영됩니다.
          </p>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueNum}>01</span>
              <h3>성경중심</h3>
              <p>모든 교육과정은 성경말씀을 중심으로 설계됩니다. 구약과 신약을 체계적으로 배우고 묵상합니다.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueNum}>02</span>
              <h3>신앙과 학문의 조화</h3>
              <p>경건한 신앙과 학문적 탁월함을 함께 추구합니다. 지식과 경건이 균형을 이루는 교육을 지향합니다.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueNum}>03</span>
              <h3>평신도 양성</h3>
              <p>교회와 사회에서 활동하는 평신도 지도자를 양성합니다. 평신도의 사명과 소명을 깨우치는 교육입니다.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueNum}>04</span>
              <h3>실천적 신학</h3>
              <p>이론에 그치지 않고 현장에서 실천할 수 있는 신학을 가르칩니다. 교회 현장과 연결된 교육을 제공합니다.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: '연혁',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>설립</h3>
                <p>대한예수교장로회 경기총회 산하 신학교육기관으로 설립</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>발전</h3>
                <p>평신도 신학교육 과정 체계화, 학부 과정 정비</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>확장</h3>
                <p>신학대학원 과정, 연구원 과정 신설</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>현재</h3>
                <p>학부, 신학대학원, 연구원 과정 운영 — 평신도 신학교육의 요람</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: '교육과정',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.curriculumGrid}>
            <div className={styles.curriculumCard}>
              <h3>학부 과정</h3>
              <p>성경학, 신학, 교회사 등 기초 신학 과목과 평신도 사역자 양성을 위한 실천 과목</p>
              <table className={styles.table}>
                <thead>
                  <tr><th>분야</th><th>과목 예시</th></tr>
                </thead>
                <tbody>
                  <tr><td>구약성경</td><td>구약개론, 모세오경, 역사서, 시가서, 예언서</td></tr>
                  <tr><td>신약성경</td><td>신약개론, 공관복음, 요한문서, 바울서신</td></tr>
                  <tr><td>신학</td><td>조직신학개론, 기독론, 구원론, 교회론, 성령론</td></tr>
                  <tr><td>교회사</td><td>교회사개론, 종교개혁사, 한국교회사, 장로교신학사</td></tr>
                  <tr><td>실천신학</td><td>설교학개론, 교육학개론, 상담학개론, 전도학, 예배학</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.curriculumCard}>
              <h3>신학대학원 과정</h3>
              <p>학부 과정 이수자를 위한 심화 신학교육 과정</p>
              <table className={styles.table}>
                <thead>
                  <tr><th>분야</th><th>과목 예시</th></tr>
                </thead>
                <tbody>
                  <tr><td>심화 성경학</td><td>구약신학, 신약신학, 성경해석학, 히브리어, 헬라어</td></tr>
                  <tr><td>심화 신학</td><td>변증신학, 윤리신학, 개혁신학, 기독교세계관</td></tr>
                  <tr><td>심화 실천</td><td>설교세미나, 목회상담, 교회성장학, 교육방법론</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.curriculumCard}>
              <h3>연구원 과정</h3>
              <p>신학적 연구 심화를 위한 최고 수준의 과정</p>
              <p className={styles.researchDesc}>
                신학논문작성법, 특강 세미나, 개별연구지도, 학위논문 등
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: '시설안내',
      content: (
        <div className={styles.tabContent}>
          <div className={styles.facilityGrid}>
            {[
              { name: '강의실 (학부용)', desc: '학부 과정 강의가 진행되는 강의실' },
              { name: '강의실 (신대원용)', desc: '신학대학원 및 연구원 강의실' },
              { name: '도서관', desc: '신학 서적과 참고 문헌을 갖춘 도서관' },
              { name: '예배당', desc: '채플 및 예배를 위한 공간' },
              { name: '세미나실', desc: '소규모 세미나 및 토론을 위한 공간' },
              { name: '교직원 연구실', desc: '교수진 연구 및 상담 공간' },
            ].map((f) => (
              <div key={f.name} className={styles.facilityCard}>
                <h4>{f.name}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageBanner title="학교소개" en="About Us" />
      <section className="section">
        <div className="container">
          <Tab tabs={tabs} />
        </div>
      </section>
    </>
  );
}
