export default function camelCaseToDashes(string) {
  return string.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}