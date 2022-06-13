# Country to ISO 3166-1 alpha-2/alpha-3

Convert inconsistent country names and codes into ISO 3166-1 alpha-2 or ISO 3166-1 alpha-3.

The aim is support English only but some native languages are included.

## Usage

```node
import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";
// const { countryToAlpha2, countryToAlpha3 } = require("country-to-iso");

// countryToAlpha2
countryToAlpha2("US"); // returns "US"
countryToAlpha2("USA"); // returns "US"
countryToAlpha2("U S A"); // returns "US"
countryToAlpha2("U.S.A"); // returns "US"
countryToAlpha2("US of A"); // returns "US"
countryToAlpha2("US and A"); // returns "US"
countryToAlpha2("United States"); // returns "US"
countryToAlpha2("United States of America"); // returns "US"
countryToAlpha2("America"); // returns "US"

// countryToAlpha3 
countryToAlpha3("US"); // returns "USA"
// etc...
```

## Commands

| Script                 | Description |
| -----------------------|-------------|
| `npm run build`        | Builds project to `lib/`. |
| `npm run seed`         | Takes data from the libraries [countryjs](https://www.npmjs.com/package/countryjs) and [country-list](https://www.npmjs.com/package/country-list) and updates `data/iso-alpha-*.json` and `data/country/*.json` files. |
| `npm run generate`     | Takes seeded data, makes variants of names, checks for clashes (there's no mechanism to handle clashes as it's not come up) and dumps the data to `data/names.json`. |
| `npm test`     | Runs tests. |

## Adding New Country Name Variants

### Update Seed Libraries

```text
npm update --save-dev countryjs country-list
npm run seed
npm run generate
npm test
```

### Manually Add Variants

Manually it manually to the correct `data/country/*.json` file and run:

```text
npm run generate
npm test
```
