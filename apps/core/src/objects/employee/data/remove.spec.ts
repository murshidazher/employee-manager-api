import { ObjectId } from "mongodb";

import { collection, deleteMany } from "src/__mocks__/mongo";

import constants from "core/constants";

import remove from "./remove"; // Update the path to the actual file location

describe("objects.employee.data.remove()", () => {
  beforeEach(() => {
    // mock db
    deleteMany.mockResolvedValue({ deletedCount: 2 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete multiple documents and return the count of deleted documents", async () => {
    const ids = [
      "5ce77168bcc028f9613019ea",
      "5ce77168bcc028f9613019eb",
      "5ce77168bcc028f9613019ec",
    ];

    const deletedCount = await remove(ids);

    expect(collection).toHaveBeenCalledWith(
      constants.collectionNames.employees
    );
    expect(deleteMany).toHaveBeenCalledWith({
      _id: ids.map((id) => new ObjectId(id)),
    });

    expect(deletedCount).toBe(2);
  });

  it("should return 0 when no documents are deleted", async () => {
    deleteMany.mockResolvedValue({ deletedCount: 0 });

    const deletedCount = await remove([]);

    expect(collection).toHaveBeenCalledWith(
      constants.collectionNames.employees
    );
    expect(deleteMany).toHaveBeenCalledWith({
      _id: [],
    });
    expect(deletedCount).toBe(0);
  });
});
