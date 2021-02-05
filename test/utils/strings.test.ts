import { normalize, removeSpaces } from "../../src/utils/strings";

describe("normalize", () => {
  it("Removes commas", () => {
    expect(normalize("test,test")).toBe("TEST TEST");
  });

  it("Removes fullstops", () => {
    expect(normalize("test.test")).toBe("TEST TEST");
  });

  it("Removes apostrophes", () => {
    expect(normalize("test's test's")).toBe("TESTS TESTS");
  });

  it("Removes parentheses", () => {
    expect(normalize("test (test)")).toBe("TEST TEST");
  });

  it("Removes all white space", () => {
    expect(normalize("test         test")).toBe("TEST TEST");
  });

  it("Trims", () => {
    expect(normalize(" test ")).toBe("TEST");
  });

  it("The Gambia => GAMBIA", () => {
    expect(normalize("The Gambia")).toBe("GAMBIA");
  });

  it("Territory of the Wallis and Futuna Island => TERRITORY WALLIS FUTUNA ISLAND", () => {
    expect(normalize("Territory of the Wallis and Futuna Island")).toBe("TERRITORY WALLIS FUTUNA ISLAND");
  });

  it("Congo, Democratic Republic of the => CONGO DEMOCRATIC REPUBLIC", () => {
    expect(normalize("Congo, Democratic Republic of the")).toBe("CONGO DEMOCRATIC REPUBLIC");
  });
});

describe("removeSpaces", () => {
  it("test test => testest", () => {
    expect(removeSpaces("test test")).toBe("testtest");
  });

  it("test     test => testest", () => {
    expect(removeSpaces("test     test")).toBe("testtest");
  });

  it("    test test     => testest", () => {
    expect(removeSpaces("    test test    ")).toBe("testtest");
  });
});
