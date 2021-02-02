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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const countryJs = __importStar(require("countryjs"));
const countryList = __importStar(require("country-list"));
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const dataDir = path.join(__dirname, "..", "..", "..", "data");
const countryDir = path.join(dataDir, "country");
const alpha2File = path.join(dataDir, "iso-alpha-2.json");
const alpha3File = path.join(dataDir, "iso-alpha-3.json");
const namesSeen = {};
const alpha2s = [];
const alpha3s = {};
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
for (const letter1 of alphabet) {
    for (const letter2 of alphabet) {
        const info = countryJs.info(`${letter1}${letter2}`);
        if (info) {
            // ISO 3166
            const { alpha2, alpha3 } = info.ISO;
            alpha2s.push(alpha2);
            alpha3s[alpha3] = alpha2;
            // Load existing data
            const countryFile = path.join(countryDir, `${alpha2}.json`);
            const data = loadCountryFile(countryFile, alpha2, alpha3);
            // Populate a set so we don't duplicate
            const names = new Set(data.names);
            names.add(alpha2);
            names.add(alpha3);
            const countryListName = countryList.getName(alpha2);
            if (typeof countryListName === 'string') {
                names.add(countryListName);
            }
            names.add(info.name);
            names.add(info.nativeName);
            for (const alt of info.altSpellings) {
                names.add(alt);
            }
            // Empty names array so we don't duplicate
            data.names = [];
            // Put names back into names array
            for (const name of names.values()) {
                if (typeof name === 'string') {
                    if (namesSeen[name]) {
                        console.log(`CLASH! "${name}" [${alpha2}] has been seen for ${namesSeen[name]}`);
                    }
                    else {
                        data.names.push(name);
                        namesSeen[name] = alpha2;
                    }
                }
            }
            fs.writeFileSync(countryFile, JSON.stringify(data, null, 2));
        }
    }
}
fs.writeFileSync(alpha2File, JSON.stringify(alpha2s, null, 2));
fs.writeFileSync(alpha3File, JSON.stringify(alpha3s, null, 2));
console.log("Complete...");
console.log(`* Countries: ${alpha2s.length};`);
console.log(`* Names: ${Object.keys(namesSeen).length}`);
