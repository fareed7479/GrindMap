import { normalizeCodeforces } from "../services/normalization/codeforces.normalizer.js";
import { normalizeCodeChef } from "../services/normalization/codechef.normalizer.js";

describe("Normalizers", () => {
  describe("normalizeCodeforces", () => {
    it("should normalize Codeforces data correctly", () => {
      const input = {
        username: "testuser",
        data: {
          rating: 1500,
          maxRating: 1600,
          rank: "specialist",
        },
      };

      const result = normalizeCodeforces(input);

      expect(result).toEqual({
        platform: "codeforces",
        username: "testuser",
        rating: 1500,
        maxRating: 1600,
        rank: "specialist",
      });
    });

    it("should handle missing optional fields", () => {
      const input = {
        username: "testuser",
        data: {},
      };

      const result = normalizeCodeforces(input);

      expect(result).toEqual({
        platform: "codeforces",
        username: "testuser",
        rating: 0,
        maxRating: 0,
        rank: "unrated",
      });
    });
  });

  describe("normalizeCodeChef", () => {
    it("should normalize CodeChef data correctly", () => {
      const input = {
        username: "testuser",
        data: {
          rating: 1800,
          problemsSolved: 150,
        },
      };

      const result = normalizeCodeChef(input);

      expect(result).toEqual({
        platform: "codechef",
        username: "testuser",
        rating: 1800,
        problemsSolved: 150,
      });
    });

    it("should handle missing rating safely", () => {
      const input = {
        username: "testuser",
        data: {},
      };

      const result = normalizeCodeChef(input);

      expect(result).toEqual({
        platform: "codechef",
        username: "testuser",
        rating: 0,
        problemsSolved: 0,
      });
    });
  });
});
