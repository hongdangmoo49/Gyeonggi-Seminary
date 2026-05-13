import PageBanner from '../components/ui/PageBanner';
import Accordion from '../components/ui/Accordion';
import styles from './Admission.module.css';

export default function Admission() {
  const faqItems = [
    {
      title: '직장인도 수강할 수 있나요?',
      content: '네, 평신도를 위한 과정이므로 직장인도 수강 가능합니다. 평일 저녁 또는 주말 수업으로 운영됩니다.',
    },
    {
      title: '타 교단 소속도 입학할 수 있나요?',
      content: '대한예수교장로회 경기총회 산하 교회 소속이 원칙이나, 자세한 사항은 사무실로 문의 바랍니다.',
    },
    {
      title: '학력 인정이 되나요?',
      content: '본 신학교는 평신도 신학교육기관으로, 학위 과정이 아닌 평신도 양성 과정입니다.',
    },
    {
      title: '수료 후 어떤 혜택이 있나요?',
      content: '소정의 과정을 이수하면 수료증이 수여되며, 교회 내 다양한 사역에 활용할 수 있습니다.',
    },
    {
      title: '등록금은 얼마인가요?',
      content: '등록금은 매 학기 개시 전 경기총회 사무실을 통해 안내드립니다. 학부, 신대원, 연구원 과정별로 상이합니다.',
    },
  ];

  return (
    <>
      <PageBanner title="입학안내" en="Admission" />
      <section className="section">
        <div className="container">
          {/* 자격 요건 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>입학 자격</h2>
            <table className={styles.table}>
              <thead>
                <tr><th>구분</th><th>자격 요건</th></tr>
              </thead>
              <tbody>
                <tr><td>신앙 자격</td><td>소속 교회 담임목사의 추천을 받은 자</td></tr>
                <tr><td>학력 자격</td><td>고등학교 졸업 이상의 학력을 가진 자</td></tr>
                <tr><td>교회 자격</td><td>대한예수교장로회 경기총회 산하 교회에서 1년 이상 출석한 자</td></tr>
                <tr><td>기타</td><td>신학교육에 대한 열의와 소명이 있는 자</td></tr>
              </tbody>
            </table>
          </div>

          {/* 입학 일정 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>입학 일정</h2>
            <div className={styles.timeline}>
              {[
                { step: '01', title: '원서접수', desc: '입학원서 및 제출서류 접수' },
                { step: '02', title: '서류심사', desc: '제출 서류 심사' },
                { step: '03', title: '면접', desc: '서류 합격자 대상 면접 실시' },
                { step: '04', title: '합격 발표', desc: '최종 합격자 발표' },
                { step: '05', title: '등록', desc: '등록금 납부 및 수강 등록' },
              ].map((item) => (
                <div key={item.step} className={styles.step}>
                  <span className={styles.stepNum}>{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.note}>상세 일정은 매 학기 공지사항을 통해 안내드립니다.</p>
          </div>

          {/* 제출 서류 */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>제출 서류</h2>
            <ol className={styles.docList}>
              <li><strong>입학원서</strong> (소정 양식)</li>
              <li><strong>교회 담임목사 추천서</strong> (소정 양식)</li>
              <li><strong>최종학력 증빙서류</strong> — 고등학교 졸업증명서 또는 졸업장 사본 (대학교 졸업증명서 해당자)</li>
              <li><strong>주민등록초본</strong> 1통</li>
              <li><strong>반명함판 사진</strong> 2매 (최근 3개월 이내 촬영)</li>
              <li><strong>자기소개서 및 신앙간증문</strong> 각 1부</li>
            </ol>
          </div>

          {/* FAQ */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>자주 묻는 질문</h2>
            <Accordion items={faqItems} />
          </div>

          {/* 문의 */}
          <div className={styles.contactBox}>
            <h3>입학 문의</h3>
            <p>대한예수교장로회 경기총회 사무실로 문의 바랍니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}
