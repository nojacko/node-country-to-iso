"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSpaces = exports.normalize = void 0;
const normalize = function (str) {
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
};
exports.normalize = normalize;
const removeSpaces = function (str) {
    return str.replace(/\s/g, "");
};
exports.removeSpaces = removeSpaces;
