export default function isDashCase(string) {
  if (!string.includes('-')) {
    return false;
  }
  if (string.toLowerCase() === string) {
    return true;
  } else {
    return false;
  }
}