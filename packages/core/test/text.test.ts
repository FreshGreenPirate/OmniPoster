import { describe, expect, it } from "vitest";
import { assembleText, hashtagFormatter, interpolateTemplate } from "../src";

describe("template interpolation", () => {
  it("replaces variables", () => {
    const result = interpolateTemplate("Hello {{platform}} {{brand}}", {
      platform: "YouTube",
      brand: "OmniPoster",
    });
    expect(result).toBe("Hello YouTube OmniPoster");
  });
});

describe("assembleText", () => {
  it("prepends template", () => {
    expect(
      assembleText("World", "Hello", "prepend", {})
    ).toBe("Hello\n\nWorld");
  });
});

describe("hashtag formatter", () => {
  it("formats youtube tags", () => {
    expect(hashtagFormatter.youtube(["#one", "two"])).toBe("one, two");
  });

  it("formats instagram tags", () => {
    expect(hashtagFormatter.instagram(["one", "#two"])).toBe("#one #two");
  });
});
