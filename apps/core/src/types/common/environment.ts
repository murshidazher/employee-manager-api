export const DEVELOPMENT = "development";
export const PRODUCTION = "prod";
export const TEST = "test";
export const TANGO = "tango";
export const QA = "qa";

export const SUPPORTED_ENVIRONMENTS = [
  DEVELOPMENT,
  PRODUCTION,
  TEST,
  TANGO,
  QA,
];

// this syntax is equals to "development" | "prod" | "test" | "tango" | "qa"
export type Environment = (typeof SUPPORTED_ENVIRONMENTS)[number];
