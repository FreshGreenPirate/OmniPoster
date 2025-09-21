import { describe, expect, it } from "vitest";
import { buildPlatformText } from "../text";

describe("buildPlatformText", () => {
  it("formats instagram hashtags", () => {
    const text = buildPlatformText({
      baseText: "New drop",
      platform: "instagram",
      hashtags: ["omni", "poster"],
    });
    expect(text).toContain("#omni #poster");
  });
});
