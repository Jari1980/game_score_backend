//unit test, everything else will be integration test
import validateMatch from "../src/utils/validateMatch.js";

describe("validateMatch", () => {
  test("valid match returns true", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(validateMatch(match)).toBe(true);
  });

  test("missing homeTeam", () => {
    const match = {
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "homeTeam and awayTeam are required",
    );
  });

  test("missing awayTeam", () => {
    const match = {
      homeTeam: "Team A",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "homeTeam and awayTeam are required",
    );
  });

  test("invalid characters in homeTeam", () => {
    const match = {
      homeTeam: "Team A@",
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "homeTeam contains invalid characters",
    );
  });

  test("invalid characters in awayTeam", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B#",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "awayTeam contains invalid characters",
    );
  });

  test("missing matchDate", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "matchDate is required and must be a valid date",
    );
  });

  test("invalid matchDate", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B",
      matchDate: "invalid-date",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "matchDate is required and must be a valid date",
    );
  });

  test("non-numeric homeTeamScore", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: "two",
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow("Scores must be numbers");
  });

  test("non-numeric awayTeamScore", () => {
    const match = {
      homeTeam: "Team A",
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: null,
    };
    expect(() => validateMatch(match)).toThrow("Scores must be numbers");
  });

  test("empty string team names", () => {
    const match = {
      homeTeam: "",
      awayTeam: "Team B",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 2,
      awayTeamScore: 1,
    };
    expect(() => validateMatch(match)).toThrow(
      "homeTeam and awayTeam are required",
    );
  });

  test("team names with spaces and numbers are valid", () => {
    const match = {
      homeTeam: "Team 123",
      awayTeam: "Team 456",
      matchDate: "2026-02-15T18:30:00Z",
      homeTeamScore: 0,
      awayTeamScore: 0,
    };
    expect(validateMatch(match)).toBe(true);
  });

  test("various valid date formats pass", () => {
    const dates = [
      "2026-02-15T18:30:00Z",
      "2026-02-15",
      new Date().toISOString(),
      "Feb 15 2026 18:30:00 GMT+0000",
    ];

    dates.forEach((date) => {
      const match = {
        homeTeam: "Team A",
        awayTeam: "Team B",
        matchDate: date,
        homeTeamScore: 1,
        awayTeamScore: 2,
      };
      expect(validateMatch(match)).toBe(true);
    });
  });
});
