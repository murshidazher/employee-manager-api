import path from "node:path";

import fs from "fs-extra";

import {makeDirectory} from "./make-directory";
import {removeDirectory} from "./remove-directory";

describe("utils.makeDirectory()", () => {
  const testDirPath = path.join(__dirname, "__test-tmp__");

  beforeAll(() => {
    removeDirectory(testDirPath);
  });

  afterAll(() => {
    removeDirectory(testDirPath);
  });

  it("should make a directory based on argument if path doesn't exist", () => {
    expect(fs.existsSync(testDirPath)).toEqual(false);
    makeDirectory(testDirPath);
    expect(fs.existsSync(testDirPath)).toEqual(true);
  });
});
