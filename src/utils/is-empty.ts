/** 빈 배열, 빈 오브젝트, null, undefined 인지를 검사 */
export function isEmpty(value: unknown): boolean {
  if (typeof value === 'number' || typeof value === 'boolean') return false;
  if (typeof value === 'undefined' || value === null) return true;
  if (value instanceof Date) return false;
  if (typeof value === 'function') return false;
  if (value instanceof Object && !Object.keys(value).length) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value === '') return true;
  return false;
}
