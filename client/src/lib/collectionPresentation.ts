export function collectionHeading(text: string) {
  const value = text.trim().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}
