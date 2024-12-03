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
    const names = [];
    // Source from "countryjs"
    const info = countryJs.info(code);
    if (info) {
        alpha2 = info.ISO.alpha2;
        alpha3 = info.ISO.alpha3;
        names.push(info.name);
        names.push(info.nativeName);
        for (const alt of info.altSpellings) {
            names.push(alt);
        }
    }
    // Source from "country-list"
    const countryListName = countryList.getName(code);
    if (countryListName) {
        alpha2 = code;
        names.push(countryListName);
    }
    // Source from "i18n-iso-countries"
    const isoNames = isoCountries.getName(code, "en", { select: "all" });
    if (Array.isArray(isoNames)) {
        isoNames.forEach(name => names.push(name));
    }
    // Populate alpha 3 if not found yet
    if (alpha2 && !alpha3) {
        alpha3 = isoCountries.alpha2ToAlpha3(code);
    }
    return { alpha2, alpha3, names };
};
const processCountryCode = function (code) {
    const countryFile = path.join(countryDir, `${code}.json`);
    let data = getCountryInfo(code);
    // Attempt to load country data from this library
    if (!data.alpha2) {
        data = loadCountryFile(countryFile, data.alpha2, data.alpha3);
    }
    if (data.alpha2) {
        // ISO 3166
        alpha2s.push(data.alpha2);
        alpha3s[data.alpha3] = data.alpha2;
        alpha23s[data.alpha2] = data.alpha3;
        // Load existing data
        data = loadCountryFile(countryFile, data.alpha2, data.alpha3);
        // Populate a set so we don't duplicate
        const namesSet = new Set(data.names);
        namesSet.add(data.alpha2);
        namesSet.add(data.alpha3);
        data.names.forEach((name) => namesSet.add(name));
        // Empty names array so we don't duplicate
        data.names = [];
        // Put names back into names array
        for (const name of namesSet) {
            if (typeof name === 'string' && name.length > 1) {
                if (namesSeen[name]) {
                    console.log(`CLASH! "${name}" [${data.alpha2}] has been seen for ${namesSeen[name]}`);
                }
                else {
                    data.names.push(name);
                    namesSeen[name] = data.alpha2;
                }
            }
        }
        fs.writeFileSync(countryFile, JSON.stringify(data, null, 2));
    }
};
const seed = function () {
    for (const letter1 of alphabet) {
        for (const letter2 of alphabet) {
            processCountryCode(`${letter1}${letter2}`);
        }
    }
    fs.writeFileSync(alpha2File, JSON.stringify(alpha2s, null, 2));
    fs.writeFileSync(alpha3File, JSON.stringify(alpha3s, null, 2));
    fs.writeFileSync(alpha23File, JSON.stringify(alpha23s, null, 2));
    console.log("Seed complete...");
    console.log(`* Countries: ${alpha2s.length};`);
    console.log(`* Names: ${Object.keys(namesSeen).length}`);
};
seed();
