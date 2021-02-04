export const normalize = function(str: string): string {
  return str.toLocaleUpperCase()
    .replace(/[,\.\(\)]/g, " ")
    .replace(/[']/g, "")
    .replace(/[\s]+/g, " ")
    .trim();
}

export const removeSpaces = function(str: string): string {
  return str.replace(/\s/g, "");
}

export const removeConjunctions = function(str: string): string {
  return str.replace(/\s(OF|AND|&amp;|&)\s/gi, " ");
}
