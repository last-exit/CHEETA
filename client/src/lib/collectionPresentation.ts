export function collectionHeading(text: string) {
  const value = text.trim().toLowerCase();
  return (value.charAt(0).toUpperCase() + value.slice(1))
    .replace(/\b(ii|iii|iv|vi|vii|viii|ix)\b/g, numeral =>
      numeral.toUpperCase()
    )
    .replace(/\bi(?=:)/g, "I")
    .replace(/\bcheeta jewels\b/gi, "Cheeta Jewels")
    .replace(/\beisa saidi\b/gi, "Eisa Saidi");
}

/** Collection page names use title case; supporting labels remain lowercase. */
export function collectionTitle(text: string) {
  return collectionHeading(text).replace(/\b[a-z]/g, letter =>
    letter.toUpperCase()
  );
}
