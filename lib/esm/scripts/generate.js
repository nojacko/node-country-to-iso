import * as fs from "fs";
import * as path from "path";
import { latinize } from "../utils/latinize";
import { normalize, removeSpaces, removeConjunctions } from "../utils/strings";
const dataDir = (__dirname.endsWith("src/scripts")) ? path.join(__dirname, "..", "..", "data") : path.join(__dirname, "..", "..", "..", "data");
const alpha2sFiles = path.join(dataDir, "iso-alpha-2.json");
const alpha2s = JSON.parse(fs.readFileSync(alpha2sFiles).toString());
const namesFile = path.join(dataDir, "names.json");
const names = {};
for (const alpha2 of alpha2s) {
    const countryFile = path.join(dataDir, "country", `${alpha2}.json`);
    const countryData = JSON.parse(fs.readFileSync(countryFile).toString());
    // Create new set to avoid duplicates
    const set = new Set(countryData.names);
    for (const name of Array.from(set)) {
        if (typeof name === 'string') {
            // We normalize all strings coming into library, so we don't need originals
            set.delete(name);
            set.add(normalize(name));
        }
    }
    for (const name of Array.from(set)) {
        if (typeof name === 'string') {
            set.add(latinize(name));
        }
    }
    for (const name of Array.from(set)) {
        if (typeof name === 'string') {
            set.add(removeConjunctions(name));
        }
    }
    for (const name of Array.from(set)) {
        if (typeof name === 'string') {
            set.add(removeSpaces(name));
        }
    }
    // Populate names
    set.forEach((name) => {
        if (typeof name === 'string') {
            if (names[name]) {
                console.log(`CLASH! "${name}" [${alpha2}] has been seen for ${names[name]}`);
            }
            else {
                names[name] = alpha2;
            }
        }
    });
}
fs.writeFileSync(namesFile, JSON.stringify(names, null, 2));
console.log("Generate complete...");
console.log(`* Countries: ${alpha2s.length};`);
console.log(`* Names: ${Object.keys(names).length}`);
