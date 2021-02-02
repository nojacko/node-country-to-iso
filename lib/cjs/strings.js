"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConjunctions = exports.removeSpaces = exports.normalize = void 0;
const normalize = function (str) {
    return str.toLocaleUpperCase()
        .replace(/[,\.]/g, " ")
        .replace(/[\s]+/g, " ")
        .trim();
};
exports.normalize = normalize;
const removeSpaces = function (str) {
    return str.replace(/\s/g, "");
};
exports.removeSpaces = removeSpaces;
const removeConjunctions = function (str) {
    return str.replace(/\s(OF|AND|&amp;|&)\s/gi, " ");
};
exports.removeConjunctions = removeConjunctions;
