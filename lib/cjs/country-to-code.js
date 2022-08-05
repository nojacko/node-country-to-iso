"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryToAlpha3 = exports.countryToAlpha2 = void 0;
const latinize_1 = require("./utils/latinize");
const strings_1 = require("./utils/strings");
const alpha2s = require("../../data/iso-alpha-2.json");
const alpha3s = require("../../data/iso-alpha-3.json");
const alpha23s = require("../../data/iso-alpha-2-to-3.json");
const names = require("../../data/names.json");
/**
 * Convert almost anything to an ISO 3166-1 alpha-2 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
const countryToAlpha2 = (str) => {
    // Check it's a string at least 2 chars long
    if (typeof str !== "string" || str.length < 2) {
        return null;
    }
    const country = (0, strings_1.removeSpaces)((0, strings_1.normalize)((0, latinize_1.latinize)(str)));
    // Too short
    if (country.length < 2) {
        return null;
    }
    // Already ISO 3166 alpha 2
    if (country.length === 2 && alpha2s.includes(country)) {
        return country;
    }
    // Is ISO 3166 alpha 3
    if (country.length === 3 && alpha3s[country]) {
        return alpha3s[country];
    }
    // Exact match
    if (names[country]) {
        return names[country];
    }
    return null;
};
exports.countryToAlpha2 = countryToAlpha2;
/**
 * Convert almost anything to an ISO 3166-1 alpha-3 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
const countryToAlpha3 = (str) => {
    const alpha2 = (0, exports.countryToAlpha2)(str);
    if (alpha2) {
        return alpha23s[alpha2];
    }
    return null;
};
exports.countryToAlpha3 = countryToAlpha3;
