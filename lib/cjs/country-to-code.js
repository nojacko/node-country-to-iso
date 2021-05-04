"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryToAlpha2 = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const latinize_1 = require("./utils/latinize");
const strings_1 = require("./utils/strings");
const rootDir = __dirname.replace(/(src|lib)([\\\/]+[a-z]+)?$/, "");
const dataDir = path.join(rootDir, "data");
const alpha2s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-2.json")).toString());
const alpha3s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-3.json")).toString());
const names = JSON.parse(fs.readFileSync(path.join(dataDir, "names.json")).toString());
/**
 * Convert almost anything to an ISO 3166-1 alpha-2 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
const countryToAlpha2 = (str) => {
    // Check it's a string at least 2 chars long
    if (typeof str !== "string" || str.length < 2) {
        return null;
    }
    const country = strings_1.removeSpaces(strings_1.normalize(latinize_1.latinize(str)));
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
