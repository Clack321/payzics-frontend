export default function isPascalCase(string) {
  return /^[A-Z][A-Za-z]*$/.test(string);
}