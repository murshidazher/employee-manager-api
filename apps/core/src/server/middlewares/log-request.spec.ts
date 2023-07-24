import { logRequestMiddleware } from "./log-request";

describe("server.middleware.logRequestMiddleware", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return pino logger function", () => {
    expect(typeof logRequestMiddleware).toBe("function");
    expect(Object.keys(logRequestMiddleware)).toEqual(
      expect.arrayContaining(["logger"])
    );
  });
});
