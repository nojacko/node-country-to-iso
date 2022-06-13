import { countryToAlpha2, countryToAlpha3 } from "../src/country-to-code";

describe("Providing non-strings/short strings", () => {
  it("empty string", () => {
    expect(countryToAlpha2("")).toBe(null);
  });

  it("X", () => {
    expect(countryToAlpha2("X")).toBe(null);
  });

  it("  X   ", () => {
    expect(countryToAlpha2("  X   ")).toBe(null);
  });

  it("null", () => {
    expect(countryToAlpha2(null)).toBe(null);
  });

  it("undefined", () => {
    expect(countryToAlpha2(undefined)).toBe(null);
  });

  it("123", () => {
    expect(countryToAlpha2(123)).toBe(null);
  });
});

describe("Providing ISO 3166-1 alpha-2", () => {
  it("GB = GB", () => expect(countryToAlpha2("GB")).toBe("GB"));
  it("US = US", () => expect(countryToAlpha2("US")).toBe("US"));
  it("XX = null", () => expect(countryToAlpha2("XX")).toBe(null));
});

describe("Providing ISO 3166-1 alpha-3", () => {
  it("GBR = GB", () => expect(countryToAlpha2("GBR")).toBe("GB"));
  it("USA = US", () => expect(countryToAlpha2("USA")).toBe("US"));
  it("XXX = null", () => expect(countryToAlpha2("XXX")).toBe(null));
});


describe("Providing ISO 3166-1 alpha-3", () => {
  it("GB = GB", () => expect(countryToAlpha3("GB")).toBe("GBR"));
  it("US = US", () => expect(countryToAlpha3("US")).toBe("USA"));
  it("XX = null", () => expect(countryToAlpha3("XX")).toBe(null));
});

describe("Providing ISO 3166-1 alpha-3", () => {
  it("GBR = GB", () => expect(countryToAlpha3("GBR")).toBe("GBR"));
  it("USA = US", () => expect(countryToAlpha3("USA")).toBe("USA"));
  it("XXX = null", () => expect(countryToAlpha3("XXX")).toBe(null));
});

describe("GB variants", () => {
  it("Great Britain", () => {
    expect(countryToAlpha2("Great Britain")).toBe("GB")
  });

  it("UK", () => {
    expect(countryToAlpha2("UK")).toBe("GB")
  });

  it("United Kingdom", () => {
    expect(countryToAlpha2("United Kingdom")).toBe("GB")
  });

  it("England", () => {
    expect(countryToAlpha2("England")).toBe("GB")
  });

  it("United Kingdom of Great Britain", () => {
    expect(countryToAlpha2("United Kingdom of Great Britain")).toBe("GB")
  });

  it("United Kingdom of Great Britain & Northern Ireland", () => {
    expect(countryToAlpha2("United Kingdom of Great Britain & Northern Ireland")).toBe("GB")
  });

  it("United Kingdom of Great Britain and Northern Ireland", () => {
    expect(countryToAlpha2("United Kingdom of Great Britain and Northern Ireland")).toBe("GB")
  });
});

describe("GB variants alpha 3", () => {
  it("Great Britain", () => {
    expect(countryToAlpha3("Great Britain")).toBe("GBR")
  });

  it("UK", () => {
    expect(countryToAlpha3("UK")).toBe("GBR")
  });

  it("United Kingdom", () => {
    expect(countryToAlpha3("United Kingdom")).toBe("GBR")
  });

  it("England", () => {
    expect(countryToAlpha3("England")).toBe("GBR")
  });

  it("United Kingdom of Great Britain", () => {
    expect(countryToAlpha3("United Kingdom of Great Britain")).toBe("GBR")
  });

  it("United Kingdom of Great Britain & Northern Ireland", () => {
    expect(countryToAlpha3("United Kingdom of Great Britain & Northern Ireland")).toBe("GBR")
  });

  it("United Kingdom of Great Britain and Northern Ireland", () => {
    expect(countryToAlpha3("United Kingdom of Great Britain and Northern Ireland")).toBe("GBR")
  });
});

describe("US variants", () => {
  it("US", () => {
    expect(countryToAlpha2("US")).toBe("US")
  });

  it("USA", () => {
    expect(countryToAlpha2("USA")).toBe("US")
  });

  it("U S A", () => {
    expect(countryToAlpha2("U S A")).toBe("US")
  });

  it("U.S.A", () => {
    expect(countryToAlpha2("U.S.A")).toBe("US")
  });

  it("USofA", () => {
    expect(countryToAlpha2("USofA")).toBe("US")
  });

  it("US and A", () => {
    expect(countryToAlpha2("US and A")).toBe("US")
  });
  it("United States", () => {
    expect(countryToAlpha2("United States")).toBe("US")
  });

  it("UnitedStatesofAmerica", () => {
    expect(countryToAlpha2("UnitedStatesofAmerica")).toBe("US")
  });

  it("United States of America", () => {
    expect(countryToAlpha2("United States of America")).toBe("US")
  });

  it("America", () => {
    expect(countryToAlpha2("America")).toBe("US")
  });
});

describe("Republic of Korea variants", () => {
  it("Korea, Republic of", () => {
    expect(countryToAlpha2("Korea, Republic of")).toBe("KR")
  });

  it("Korea (Republic of)", () => {
    expect(countryToAlpha2("Korea (Republic of)")).toBe("KR")
  });

  it("Republic of Korea", () => {
    expect(countryToAlpha2("Republic of Korea")).toBe("KR")
  });

  it("South Korea", () => {
    expect(countryToAlpha2("South Korea")).toBe("KR")
  });
});

describe("Hong Kong variants", () => {
  it("HKSAR", () => {
    expect(countryToAlpha2("HKSAR")).toBe("HK")
  });

  it("Hong Kong", () => {
    expect(countryToAlpha2("Hong Kong")).toBe("HK")
  });

  it("Hong Kong SAR China", () => {
    expect(countryToAlpha2("Hong Kong SAR China")).toBe("HK")
  });
});
