import { normalize, removeSpaces, removeConjunctions} from "../src/strings";

describe("normalize", () => {
  it("Removes commas", () => {
    expect(normalize("test,test")).toBe("TEST TEST");
  });

  it("Removes fullstops", () => {
    expect(normalize("test.test")).toBe("TEST TEST");
  });

  it("Removes excess white space", () => {
    expect(normalize("test         test")).toBe("TEST TEST");
  });

  it("Trims", () => {
    expect(normalize(" test ")).toBe("TEST");
  });
});

describe("removeSpaces", () => {
  it("Removes spaces", () => {
    expect(removeSpaces("   t e   s    t ")).toBe("test");
  });
});

describe("removeConjunctions", () => {
  it("and", () => {
    expect(removeConjunctions("Test and Test")).toBe("Test Test");
  });

  it("of", () => {
    expect(removeConjunctions("Test of Test")).toBe("Test Test");
  });

  it("&", () => {
    expect(removeConjunctions("Test & Test")).toBe("Test Test");
  });

  it("&amp;", () => {
    expect(removeConjunctions("Test &amp; Test")).toBe("Test Test");
  });
});
