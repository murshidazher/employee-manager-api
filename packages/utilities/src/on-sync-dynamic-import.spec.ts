import exampleConfig from "./__mocks__/example-config-file";
import { onSyncDynamicImport } from "./on-sync-dynamic-import";

describe("utils.onSyncDynamicImport()", () => {
  it("should dynamically import the example config file", async () => {
    const data = await onSyncDynamicImport(`./__mocks__/example-config-file`);

    expect(data).toEqual(exampleConfig);
  });

  it("should return an empty object, if the file is not found", async () => {
    const data = await onSyncDynamicImport(`./__mocks__/no-such-file`);

    expect(data).toEqual({});
  });
});
