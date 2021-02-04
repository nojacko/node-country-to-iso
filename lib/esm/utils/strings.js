export const normalize = function (str) {
    return str.toLocaleUpperCase()
        .replace(/[,\.\(\)]/g, " ")
        .replace(/[']/g, "")
        .replace(/[\s]+/g, " ")
        .trim();
};
export const removeSpaces = function (str) {
    return str.replace(/\s/g, "");
};
export const removeConjunctions = function (str) {
    return str.replace(/\s(OF|AND|&amp;|&)\s/gi, " ");
};
