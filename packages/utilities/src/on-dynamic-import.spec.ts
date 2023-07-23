import exampleConfig from "./__mocks__/example-config-file";
import { onDynamicImport } from "./on-dynamic-import";

describe("utils.onDynamicImport()", () => {
  it("should dynamically import the example config file", async () => {
    const data = await onDynamicImport(`./__mocks__/example-config-file.ts`);

    expect(data).toEqual(exampleConfig);
  });

  it("should return an empty object, if the file is not found", async () => {
    const data = await onDynamicImport(`./__mocks__/no-such-file.js`);

    expect(data).toEqual({});
  });
});
