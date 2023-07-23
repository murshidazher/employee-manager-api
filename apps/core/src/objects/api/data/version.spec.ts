import { config } from "src/__mocks__/config";

import version from "./version";

describe("objects.api.data.version()", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns the current version of API", () => {
    const response = version();
    expect(response).toBe(config.data.version);
  });
});
