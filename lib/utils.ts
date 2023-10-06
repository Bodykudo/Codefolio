export function isBase64DataURL(value: string) {
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  return base64Regex.test(value);
}
