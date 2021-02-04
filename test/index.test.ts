import { countryToAlpha2 } from "../src";

describe("Test the public API", () => {
  it("countryToAlpha2 is a function", () => {
    expect(countryToAlpha2).toBeInstanceOf(Function);
  });
});
