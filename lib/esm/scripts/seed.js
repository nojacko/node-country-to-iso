import * as fs from "fs";
import * as path from "path";
import * as countryJs from "countryjs";
import * as countryList from "country-list";
import * as isoCountries from "i18n-iso-countries";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const dataDir = path.join(__dirname, "..", "..", "..", "data");
const countryDir = path.join(dataDir, "country");
const alpha2File = path.join(dataDir, "iso-alpha-2.json");
const alpha3File = path.join(dataDir, "iso-alpha-3.json");
const alpha23File = path.join(dataDir, "iso-alpha-2-to-3.json");
const namesSeen = {};
const alpha2s = [];
const alpha3s = {};
const alpha23s = {};
const loadCountryFile = function (file, alpha2, alpha3) {
    let data = {
        alpha2,
        alpha3,
        names: []
    };
    try {
        const stat = fs.lstatSync(file);
        if (stat.isFile()) {
            data = JSON.parse(fs.readFileSync(file).toString());
        }
    }
    catch (err) {
        // Ignore file doesn't exist error as we'll create it
        if (err.code !== "ENOENT") {
            console.log(file);
            throw err;
        }
    }
    return data;
};
const getCountryInfo = function (code) {
    let alpha2 = null;
    let alpha3 = null;
    const possibleNames = [];
    // Source from "countryjs"
    const info = countryJs.info(code);
    if (info) {
        alpha2 = info.ISO.alpha2;
        alpha3 = info.ISO.alpha3;
        possibleNames.push(info.name);
        possibleNames.push(info.nativeName);
        for (const alt of info.altSpellings) {
            possibleNames.push(alt);
        }
    }
    // Source from "country-list"
    const countryListName = countryList.getName(code);
    if (countryListName) {
        alpha2 = code;
        possibleNames.push(countryListName);
    }
    // Source from "i18n-iso-countries"
    const isoNames = isoCountries.getName(code, "en", { select: "all" });
    if (Array.isArray(isoNames)) {
        isoNames.forEach(name => possibleNames.push(name));
    }
    // Populate alpha 3 if not found yet
    if (alpha2 && !alpha3) {
        alpha3 = isoCountries.alpha2ToAlpha3(code);
    }
    return { alpha2, alpha3, possibleNames };
};
for (const letter1 of alphabet) {
    for (const letter2 of alphabet) {
        const code = `${letter1}${letter2}`;
        const { alpha2, alpha3, possibleNames } = getCountryInfo(code);
        if (alpha2) {
            // ISO 3166
            alpha2s.push(alpha2);
            alpha3s[alpha3] = alpha2;
            alpha23s[alpha2] = alpha3;
            // Load existing data
            const countryFile = path.join(countryDir, `${alpha2}.json`);
            const data = loadCountryFile(countryFile, alpha2, alpha3);
            // Populate a set so we don't duplicate
            const names = new Set(data.names);
            names.add(alpha2);
            names.add(alpha3);
            possibleNames.forEach((name) => names.add(name));
            // Empty names array so we don't duplicate
            data.names = [];
            // Put names back into names array
            names.forEach((name) => {
                if (typeof name === 'string' && name.length > 1) {
                    if (namesSeen[name]) {
                        console.log(`CLASH! "${name}" [${alpha2}] has been seen for ${namesSeen[name]}`);
                    }
                    else {
                        data.names.push(name);
                        namesSeen[name] = alpha2;
                    }
                }
            });
            fs.writeFileSync(countryFile, JSON.stringify(data, null, 2));
        }
    }
}
fs.writeFileSync(alpha2File, JSON.stringify(alpha2s, null, 2));
fs.writeFileSync(alpha3File, JSON.stringify(alpha3s, null, 2));
fs.writeFileSync(alpha23File, JSON.stringify(alpha23s, null, 2));
console.log("Seed complete...");
console.log(`* Countries: ${alpha2s.length};`);
console.log(`* Names: ${Object.keys(namesSeen).length}`);
