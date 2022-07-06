export default function dashesToCamelCase(string) {
  return string
  .toLowerCase()
  .split('-')
  .map(it => it.charAt(0).toUpperCase() + it.substr(1))
  .join('');
}