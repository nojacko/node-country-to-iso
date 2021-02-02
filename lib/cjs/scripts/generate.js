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
const latinize_1 = require("../latinize");
const strings_1 = require("../strings");
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
    set.forEach((name) => {
        if (typeof name === 'string') {
            set.add(strings_1.normalize(name));
        }
    });
    set.forEach((name) => {
        if (typeof name === 'string') {
            set.add(latinize_1.latinize(name));
        }
    });
    set.forEach((name) => {
        if (typeof name === 'string') {
            set.add(strings_1.removeConjunctions(name));
        }
    });
    set.forEach((name) => {
        if (typeof name === 'string') {
            set.add(strings_1.removeSpaces(name));
        }
    });
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
