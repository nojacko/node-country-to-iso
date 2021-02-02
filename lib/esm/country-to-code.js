import * as fs from "fs";
import * as path from "path";
import { normalize, removeSpaces, removeConjunctions } from "./strings";
const dataDir = (__dirname.endsWith("src"))
    ? path.join(__dirname, "..", "data")
    : path.join(__dirname, "..", "..", "data");
const alpha2s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-2.json")).toString());
const alpha3s = JSON.parse(fs.readFileSync(path.join(dataDir, "iso-alpha-3.json")).toString());
const names = JSON.parse(fs.readFileSync(path.join(dataDir, "names.json")).toString());
export const countryToAlpha2 = (str) => {
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
};
