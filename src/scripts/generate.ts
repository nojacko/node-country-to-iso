import * as fs from "fs";
import * as path from "path";

import { latinize } from "../utils/latinize";
import { normalize, removeSpaces } from "../utils/strings";

const rootDir = __dirname.replace(/(src|lib)([\/\\a-z])*$/, "");
const dataDir = path.join(rootDir, "data");
const alpha2sFiles = path.join(dataDir, "iso-alpha-2.json");
const alpha2s = JSON.parse(fs.readFileSync(alpha2sFiles).toString());
const namesFile = path.join(dataDir, "names.json");

const names: {[key: string] : string } = {};

for (const alpha2 of alpha2s) {
    const countryFile = path.join(dataDir, "country", `${alpha2}.json`);
    const countryData = JSON.parse(fs.readFileSync(countryFile).toString());

    // Create new set to avoid duplicates
    const set = new Set(countryData.names);

    for (const name of Array.from(set)) {
        if (typeof name === 'string') {
            set.delete(name);
            const latinized = latinize(name);
            set.add(removeSpaces(normalize(latinized)));
            set.add(removeSpaces(normalize(removeSpaces(latinized))));
        }
    }

    // Populate names
    set.forEach((name) => {
        if (typeof name === 'string' && name.length) {
            if (names[name]) {
                console.log(`CLASH! "${name}" [${alpha2}] has been seen for ${names[name]}`);
            } else {
                names[name] = alpha2;
            }
        }
    });
}

fs.writeFileSync(namesFile, JSON.stringify(names, null, 2));

console.log("Generate complete...");
console.log(`* Countries: ${alpha2s.length};`);
console.log(`* Names: ${Object.keys(names).length}`);
