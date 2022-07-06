export default function isUnderscoreCase(string) {
  if (!string.includes('_')) {
    return false;
  }
  if (string.toLowerCase() === string) {
    return true;
  } else {
    return false;
  }
}