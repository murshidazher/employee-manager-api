import path from "node:path";

import fs from "fs-extra";

import { makeDirectory } from "./make-directory";
import { removeDirectory } from "./remove-directory";

describe("utils.removeDirectory()", () => {
  const testDirPath = path.join(__dirname, "__test-tmp__");

  beforeAll(() => {
    makeDirectory(testDirPath);
  });

  afterAll(() => {
    removeDirectory(testDirPath);
  });

  it("should remove the directory if a valid path is passed", () => {
    expect(fs.existsSync(testDirPath)).toEqual(true);
    removeDirectory(testDirPath);
    expect(fs.existsSync(testDirPath)).toEqual(false);
  });

  it("it doesn't throw an error if path is invalid", () => {
    expect(() => {
      removeDirectory("abc..");
    }).not.toThrow();
  });
});
