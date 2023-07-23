import error from "./data";

describe("objects.error.data()", () => {
  const errorMessage = "test error";
  it("throws a not found error with specified message", () => {
    const errorObj = error.newNotFound(errorMessage);
    expect(errorObj instanceof Error).toBe(true);
    expect(errorObj.message).toBe(`NOT_FOUND: ${errorMessage}`);
  });

  it("throws an operation failed error with specified message", () => {
    const errorObj = error.newOperationFailed(errorMessage);
    expect(errorObj instanceof Error).toBe(true);
    expect(errorObj.message).toBe(`OPERATION_FAILED: ${errorMessage}`);
  });

  it("throws an invalid input error with specified message", () => {
    const errorObj = error.newInvalidInput(errorMessage);
    expect(errorObj instanceof Error).toBe(true);
    expect(errorObj.message).toBe(`INVALID_INPUT: ${errorMessage}`);
  });

  it("throws an access denied error with specified message", () => {
    const errorObj = error.newAccessDenied(errorMessage);
    expect(errorObj instanceof Error).toBe(true);
    expect(errorObj.message).toBe(`ACCESS_DENIED: ${errorMessage}`);
  });
});
