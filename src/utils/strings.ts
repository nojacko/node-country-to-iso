export const normalize = function(str: string): string {
  return str.toLocaleUpperCase()
    .replace(/[,\.\(\)]/g, " ")
    // Remove punctuation
    .replace(/['\-]/g, "")
    // Remove unimportant words
    .replace(/(^|\s)OF(\s|$)/gi, " ")
    .replace(/(^|\s)AND(\s|$)/gi, " ")
    .replace(/(^|\s)THE(\s|$)/gi, " ")
    .replace(/(^|\s)&AMP;(\s|$)/gi, " ")
    .replace(/(^|\s)&(\s|$)/gi, " ")
    // Remove excess
    .replace(/\s+/g, " ")
    .trim();
}

export const removeSpaces = function(str: string): string {
  return str.replace(/\s/g, "");
}
