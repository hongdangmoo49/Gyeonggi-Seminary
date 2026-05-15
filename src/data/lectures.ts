import type { Lecture } from '../types';

const undergraduateLectures: Lecture[] = [
  // 구약성경
  { id: 1, category: '구약성경', name: '구약개론', professor: '김XX 교수', semester: '2026-1', credits: 3, description: '구약성경의 전체 구조와 배경, 각 권의 핵심 메시지를 개괄합니다.' },
  { id: 2, category: '구약성경', name: '모세오경', professor: '김XX 교수', semester: '2026-1', credits: 3, description: '창세기~신명기까지의 텍스트를 깊이 있게 학습합니다.' },
  { id: 3, category: '구약성경', name: '역사서', professor: '박XX 교수', semester: '2026-2', credits: 3, description: '여호수아~에스더까지의 역사적 배경과 영적 교훈을 탐구합니다.' },
  { id: 4, category: '구약성경', name: '시가서', professor: '박XX 교수', semester: '2026-2', credits: 3, description: '시편, 잠언, 욥기 등 시가문학의 신학적 의미를 연구합니다.' },
  { id: 5, category: '구약성경', name: '예언서', professor: '이XX 교수', semester: '2026-1', credits: 3, description: '대·소 예언서의 메시지와 현대적 의미를 고찰합니다.' },

  // 신약성경
  { id: 6, category: '신약성경', name: '신약개론', professor: '이XX 교수', semester: '2026-1', credits: 3, description: '신약성경의 전체 구조와 배경, 각 권의 핵심 주제를 개괄합니다.' },
  { id: 7, category: '신약성경', name: '공관복음', professor: '최XX 교수', semester: '2026-1', credits: 3, description: '마태, 마가, 누가 복음서를 비교 연구합니다.' },
  { id: 8, category: '신약성경', name: '요한문서', professor: '최XX 교수', semester: '2026-2', credits: 3, description: '요한복음과 요한서신의 신학을 심도 있게 탐구합니다.' },
  { id: 9, category: '신약성경', name: '바울서신', professor: '이XX 교수', semester: '2026-2', credits: 3, description: '바울 서신의 신학적 주제와 메시지를 연구합니다.' },
  { id: 10, category: '신약성경', name: '계시록', professor: '이XX 교수', semester: '2026-2', credits: 3, description: '요한계시록의 종말론적 의미와 소망의 메시지를 고찰합니다.' },

  // 신학
  { id: 11, category: '신학', name: '조직신학개론', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '기독교 교리의 체계적 이해를 위한 기초 과정입니다.' },
  { id: 12, category: '신학', name: '기독론', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '예수 그리스도의 인격과 사역에 관한 교리를 연구합니다.' },
  { id: 13, category: '신학', name: '구원론', professor: '정XX 교수', semester: '2026-2', credits: 3, description: '칭의, 성화, 영화에 관한 개혁신학적 교리를 학습합니다.' },
  { id: 14, category: '신학', name: '교회론', professor: '정XX 교수', semester: '2026-2', credits: 3, description: '교회의 본질, 사명, 직제에 관한 성경적 이해를 돕습니다.' },
  { id: 15, category: '신학', name: '성령론', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '성령의 인격과 사역, 은사에 관한 교리를 연구합니다.' },

  // 교회사
  { id: 16, category: '교회사', name: '교회사개론', professor: '한XX 교수', semester: '2026-1', credits: 3, description: '초대교회부터 현대교회까지의 역사를 개괄합니다.' },
  { id: 17, category: '교회사', name: '종교개혁사', professor: '한XX 교수', semester: '2026-2', credits: 3, description: '16세기 종교개혁의 배경, 전개, 의의를 고찰합니다.' },
  { id: 18, category: '교회사', name: '한국교회사', professor: '한XX 교수', semester: '2026-1', credits: 3, description: '한국 기독교의 역사와 발전 과정을 추적합니다.' },
  { id: 19, category: '교회사', name: '장로교신학사', professor: '한XX 교수', semester: '2026-2', credits: 3, description: '장로교 신학의 역사적 전개와 특징을 연구합니다.' },

  // 실천신학
  { id: 20, category: '실천신학', name: '설교학개론', professor: '윤XX 교수', semester: '2026-1', credits: 3, description: '설교의 원리와 실제, 설교 작성법을 학습합니다.' },
  { id: 21, category: '실천신학', name: '교육학개론', professor: '윤XX 교수', semester: '2026-1', credits: 3, description: '기독교교육의 원리와 방법론을 탐구합니다.' },
  { id: 22, category: '실천신학', name: '상담학개론', professor: '강XX 교수', semester: '2026-2', credits: 3, description: '기독교 상담의 기초 이론과 실제를 학습합니다.' },
  { id: 23, category: '실천신학', name: '전도학', professor: '강XX 교수', semester: '2026-1', credits: 3, description: '복음 전도의 원리와 다양한 실천 방법을 연구합니다.' },
  { id: 24, category: '실천신학', name: '예배학', professor: '윤XX 교수', semester: '2026-2', credits: 3, description: '예배의 신학적 기초와 예배의 실제를 다룹니다.' },
];

const graduateLectures: Lecture[] = [
  // 심화 성경학
  { id: 101, category: '심화 성경학', name: '구약신학', professor: '김XX 교수', semester: '2026-1', credits: 3, description: '구약성경의 신학적 주제를 심화 연구합니다.' },
  { id: 102, category: '심화 성경학', name: '신약신학', professor: '이XX 교수', semester: '2026-1', credits: 3, description: '신약성경의 신학적 주제를 심화 연구합니다.' },
  { id: 103, category: '심화 성경학', name: '성경해석학', professor: '최XX 교수', semester: '2026-1', credits: 3, description: '성경 해석의 원리와 방법론을 체계적으로 학습합니다.' },
  { id: 104, category: '심화 성경학', name: '히브리어 기초', professor: '김XX 교수', semester: '2026-2', credits: 3, description: '구약 원어(히브리어)의 기초 문법과 독해를 학습합니다.' },
  { id: 105, category: '심화 성경학', name: '헬라어 기초', professor: '이XX 교수', semester: '2026-2', credits: 3, description: '신약 원어(헬라어)의 기초 문법과 독해를 학습합니다.' },

  // 심화 신학
  { id: 106, category: '심화 신학', name: '변증신학', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '기독교 진리의 변증과 현대 사상에 대한 응답을 연구합니다.' },
  { id: 107, category: '심화 신학', name: '윤리신학', professor: '정XX 교수', semester: '2026-2', credits: 3, description: '기독교 윤리의 원리와 현대 사회적 쟁점에의 적용을 탐구합니다.' },
  { id: 108, category: '심화 신학', name: '개혁신학', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '장로교·개혁신학의 핵심 교리를 심도 있게 연구합니다.' },
  { id: 109, category: '심화 신학', name: '기독교세계관', professor: '정XX 교수', semester: '2026-2', credits: 3, description: '기독교적 세계관의 정립과 문화·사회적 실천을 모색합니다.' },

  // 심화 실천신학
  { id: 110, category: '심화 실천신학', name: '설교세미나', professor: '윤XX 교수', semester: '2026-1', credits: 3, description: '실제 설교 작성과 발표 실습을 통해 설교 역량을 강화합니다.' },
  { id: 111, category: '심화 실천신학', name: '목회상담세미나', professor: '강XX 교수', semester: '2026-1', credits: 3, description: '목회 현장에서의 상담 실습과 사례 연구를 진행합니다.' },
  { id: 112, category: '심화 실천신학', name: '교회성장학', professor: '윤XX 교수', semester: '2026-2', credits: 3, description: '교회 성장의 원리와 전략, 성경적 모델을 연구합니다.' },
  { id: 113, category: '심화 실천신학', name: '기독교교육방법론', professor: '강XX 교수', semester: '2026-2', credits: 3, description: '교회 교육의 체계적 방법과 실천적 적용을 다룹니다.' },
];

const researchLectures: Lecture[] = [
  { id: 201, category: '연구원', name: '신학논문작성법', professor: '정XX 교수', semester: '2026-1', credits: 3, description: '학술 논문 작성의 원리와 실제를 체계적으로 학습합니다.' },
  { id: 202, category: '연구원', name: '특강 세미나', professor: '초빙 교수', semester: '2026-1', credits: 3, description: '매 학기 초빙 교수의 특강 (주제는 학기별로 변경됩니다).' },
  { id: 203, category: '연구원', name: '개별연구지도', professor: '지도교수', semester: '2026-1', credits: 3, description: '지도교수와의 1:1 연구 지도를 통해 논문 주제를 발전시킵니다.' },
  { id: 204, category: '연구원', name: '학위논문', professor: '지도교수', semester: '2026-2', credits: 6, description: '연구원 졸업 논문 작성 — 연구 설계부터 완성까지 지도받습니다.' },
];

export { undergraduateLectures, graduateLectures, researchLectures };
