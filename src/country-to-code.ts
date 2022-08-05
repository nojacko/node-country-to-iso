import { latinize } from "./utils/latinize";
import { normalize, removeSpaces } from "./utils/strings";

const alpha2s = require("../data/iso-alpha-2.json");
const alpha3s = require("../data/iso-alpha-3.json");
const alpha23s = require("../data/iso-alpha-2-to-3.json");
const names = require("../data/names.json");

/**
 * Convert almost anything to an ISO 3166-1 alpha-2 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
export const countryToAlpha2 = (str: any) : string|null  => {
  // Check it's a string at least 2 chars long
  if (typeof str !== "string" || str.length < 2) {
    return null;
  }

  const country = removeSpaces(normalize(latinize(str)));

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
}

/**
 * Convert almost anything to an ISO 3166-1 alpha-3 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
 export const countryToAlpha3 = (str: any) : string|null  => {
   
  const alpha2 = countryToAlpha2(str);

  if (alpha2) {
    return alpha23s[alpha2];
  }

  return null;
}
