import { latinize} from "../../src/utils/latinize";

describe("latinize", () => {
  it("Ấ", () => {
    expect(latinize("Ấ")).toBe("A");
  });

  it("null", () => {
    expect(latinize(null)).toBe(null);
  });

  it("123", () => {
    expect(latinize(123)).toBe(123);
  });
});
