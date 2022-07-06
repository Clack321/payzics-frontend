export default function camelCaseUnderScore(string) {
  return string.replace(/[A-Z]/g, m => "_" + m.toLowerCase());
}