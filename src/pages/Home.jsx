export default function Home() {
  return (
    <div>
      <section style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(27,42,74,0.9), rgba(44,95,138,0.8))', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'var(--text-display)', marginBottom: 'var(--space-md)' }}>
            경기신학교에 오신 것을<br />환영합니다
          </h1>
          <p style={{ fontSize: 'var(--text-h4)', opacity: 0.8, marginBottom: 'var(--space-xl)' }}>
            대한예수교장로회 경기총회 평신도 신학교육기관
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/Gyeonggi-Seminary/admission" style={{ padding: '12px 32px', background: 'var(--color-gold)', color: 'var(--color-navy)', borderRadius: 'var(--border-radius)', fontWeight: 600 }}>입학안내</a>
            <a href="/Gyeonggi-Seminary/undergraduate" style={{ padding: '12px 32px', border: '2px solid rgba(255,255,255,0.6)', color: '#fff', borderRadius: 'var(--border-radius)', fontWeight: 600 }}>강의실 입장</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-light)' }}>콘텐츠가 준비 중입니다.</p>
        </div>
      </section>
    </div>
  );
}
