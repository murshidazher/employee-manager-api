import { getRandomNumber } from "./get-random-number";

describe("utils.getRandomNumber()", () => {
  it('should generate a random number between 1 and 99 (inclusive)', () => {
    const randomNumber = getRandomNumber(1, 99);
    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(99);
    expect(Number.isInteger(randomNumber)).toBe(true);
  });

  it('should return the provided number if min and max are the same', () => {
    const sameNumber = getRandomNumber(42, 42);
    expect(sameNumber).toBe(42);
  });

  it('should handle negative ranges correctly', () => {
    const negativeRandomNumber = getRandomNumber(-10, -1);
    expect(negativeRandomNumber).toBeGreaterThanOrEqual(-10);
    expect(negativeRandomNumber).toBeLessThanOrEqual(-1);
    expect(Number.isInteger(negativeRandomNumber)).toBe(true);
  });

  it('should return NaN if min is greater than max', () => {
    const invalidNumber = getRandomNumber(99, 1);
    expect(isNaN(invalidNumber)).toBe(true);
  });
});
