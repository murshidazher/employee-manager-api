import { ObjectId } from "mongodb";

import { collection, updateOne } from "src/__mocks__/mongo";

import constants from "core/constants";

import update from "./update";

describe("objects.employee.data.update()", () => {
  beforeEach(() => {
    // mock db
    updateOne.mockResolvedValue({ modifiedCount: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update an employee document and return the count of modified documents", async () => {
    const id = "5ce77168bcc028f9613019ea";
    const payload = {
      firstName: "John",
    };

    const modifiedCount = await update(id, payload);

    expect(collection).toHaveBeenCalledWith(
      constants.collectionNames.employees
    );

    expect(updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName: "John",
          updatedAt: expect.any(Date),
        },
      }
    );
    expect(modifiedCount).toBe(1);
  });

  it("should return 0 when no documents are updated", async () => {
    updateOne.mockResolvedValue({ modifiedCount: 0 });

    const id = "5ce77168bcc028f9613019eb";
    const payload = {
      firstName: "John",
    };

    const modifiedCount = await update(id, payload);

    expect(collection).toHaveBeenCalledWith(
      constants.collectionNames.employees
    );
    expect(updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName: "John",
          updatedAt: expect.any(Date),
        },
      }
    );
    expect(modifiedCount).toBe(0);
  });
});
