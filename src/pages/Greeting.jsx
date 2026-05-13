import PageBanner from '../components/ui/PageBanner';
import styles from './Greeting.module.css';

export default function Greeting() {
  return (
    <>
      <PageBanner title="학장인사" subtitle="주의 말씀은 내 발의 등이요 내 길의 빛이니이다 — 시편 119:105" en="Greeting from the President" />
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.photoArea}>
              <div className={styles.photoPlaceholder}>
                <span>학장 사진</span>
              </div>
            </div>
            <div className={styles.messageArea}>
              <div className={styles.messageContent}>
                <p>주안에서 사랑하는 성도 여러분, 평안하십니까.</p>
                <p>
                  대한예수교장로회 경기총회 경기신학교 홈페이지에 오신 것을 진심으로 환영합니다.
                </p>
                <p>
                  경기신학교는 평신도 성도님들께 체계적이고 깊이 있는 신학교육을 제공하기 위해 설립된 교육기관입니다.
                  우리 신학교는 성경말씀을 중심으로 한 신학적 훈련과 경건한 신앙생활을 통해, 교회와 사회에서
                  하나님 나라를 위해 헌신할 수 있는 평신도 지도자를 양성하고 있습니다.
                </p>

                <p>우리 신학교만의 특징은 다음과 같습니다.</p>

                <div className={styles.feature}>
                  <strong>첫째, 성경중심의 교육</strong>
                  <p>모든 교육과정은 하나님의 말씀인 성경을 중심으로 설계되어 있으며, 학생들은 구약과 신약을 체계적으로 배우고 묵상할 수 있습니다.</p>
                </div>
                <div className={styles.feature}>
                  <strong>둘째, 실천적 신학훈련</strong>
                  <p>배운 것을 교회 현장에서 실천할 수 있도록, 교회사, 조직신학, 실천신학 등 다양한 분야의 실천적 과목을 개설하고 있습니다.</p>
                </div>
                <div className={styles.feature}>
                  <strong>셋째, 평신도 맞춤 교육</strong>
                  <p>직장과 가정에서 생활하며 신학을 공부할 수 있도록, 평신도의 상황에 맞춘 교육 일정과 방식을 운영하고 있습니다.</p>
                </div>

                <p>
                  하나님께서 이 신학교를 통해 많은 평신도 지도자를 세워주실 것을 확신하며,
                  성령님의 인도하심 속에 최선의 교육 환경을 제공하기 위해 노력하겠습니다.
                </p>
                <p>
                  신학교육을 통해 하나님을 더 깊이 알아가고자 하는 모든 분들을 주님의 이름으로 초대합니다.
                </p>
                <p className={styles.closing}>감사합니다.</p>
                <p className={styles.signature}>경기신학교 학장</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
