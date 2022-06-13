import { countryToAlpha2, countryToAlpha3 } from "../src";

describe("Test the public API", () => {
  it("countryToAlpha2 is a function", () => {
    expect(countryToAlpha2).toBeInstanceOf(Function);
  });
  it("countryToAlpha3 is a function", () => {
    expect(countryToAlpha3).toBeInstanceOf(Function);
  });
});
