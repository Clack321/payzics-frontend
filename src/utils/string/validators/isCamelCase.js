export default function isCamelCase(string) {
  return /^([a-z]+)(([A-Z]([a-z]+))+)$/.test(string)
}