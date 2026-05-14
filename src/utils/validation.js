const HTML_TAG_RE = /<[^>]*>/g;
const SCRIPT_RE = /<script[\s>]/i;
const EVENT_RE = /on\w+\s*=/i;

export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function hasHtmlTags(str) {
  if (typeof str !== 'string') return false;
  return HTML_TAG_RE.test(str) || SCRIPT_RE.test(str) || EVENT_RE.test(str);
}

export function validateLength(value, min, max) {
  const len = (value || '').length;
  if (len < min) return `${min}자 이상 입력해주세요.`;
  if (len > max) return `최대 ${max}자까지 입력 가능합니다.`;
  return null;
}

export function validateInput(value, { min = 1, max = 1000, label = '항목' } = {}) {
  if (!value || !value.trim()) return `${label}을(를) 입력해주세요.`;
  if (hasHtmlTags(value)) return 'HTML 태그는 사용할 수 없습니다.';
  const lengthError = validateLength(value, min, max);
  if (lengthError) return lengthError;
  return null;
}
