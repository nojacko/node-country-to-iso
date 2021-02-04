import * as fs from "fs";
import * as path from "path";
import { normalize, removeSpaces, removeConjunctions } from "./utils/strings";

const rootDir = __dirname.replace(/(src|lib)(\/[a-z]+)?$/, "");
const dataDir = path.join(rootDir, "data");
const alpha2s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-2.json")).toString());
const alpha3s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-3.json")).toString());
const names = JSON.parse(fs.readFileSync(path.join(dataDir, "names.json")).toString());

/**
 * Convert almost anything to an ISO 3166-1 alpha-2 code.
 * @param str String to convert. Note: any is used so we can test non-string values returning null for CommonJS version.
 */
export const countryToAlpha2 = (str: any) : string|null  => {
  if (typeof str !== "string") {
    return null;
  }

  const country = normalize(str);

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

  // Try without spaces
  const countryMinusSpaces = removeSpaces(country);
  if (names[countryMinusSpaces]) {
    return names[countryMinusSpaces];
  }

  // Try without conjunctions
  const countryMinusConjunctions = removeConjunctions(country);
  if (names[countryMinusConjunctions]) {
    return names[countryMinusConjunctions];
  }

  // Try without conjunctions and without spaces
  const countryMinusConjunctionsSpaces = removeSpaces(countryMinusConjunctions);
  if (names[countryMinusConjunctionsSpaces]) {
    return names[countryMinusConjunctionsSpaces];
  }

  return null;
}
