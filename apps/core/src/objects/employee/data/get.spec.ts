import mockDate from "mockdate";
import { ObjectId } from "mongodb";

import { countDocuments, find, sort, toArray } from "src/__mocks__/mongo";

import get, { count } from "./get";

describe("objects.employee.data.get()", () => {
  const now = new Date("2021-10-12");

  const commonAttributes = {
    firstName: "Henri",
    lastName: "Rodriguez",
    email: "Darrin_Rippin@gmail.com",
    number: "+94771277218",
    gender: "M",
    photo: "https://randomuser.me/api/portraits/men/92.jpg",
    createdAt: now,
    updatedAt: now,
  };

  const rawEmployee = {
    _id: new ObjectId("5ce77168bcc028f9613019ea"),
    ...commonAttributes,
  };

  beforeEach(() => {
    mockDate.set(now);

    // mock db
    toArray.mockResolvedValue([rawEmployee]);
    sort.mockImplementation(() => ({
      toArray,
    }));
    find.mockImplementation(() => ({
      sort,
    }));
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
  });

  it("fetches employee data from database based on id", async () => {
    await get({
      ids: ["5ce77168bcc028f9613019ea"],
    });

    expect(find).toHaveBeenCalledTimes(1);
    expect(find).toHaveBeenNthCalledWith(1, {
      _id: { $in: [new ObjectId("5ce77168bcc028f9613019ea")] },
    });

    expect(sort).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenNthCalledWith(1, { createdAt: -1 });

    expect(toArray).toHaveBeenCalledTimes(1);
  });

  it("returns the fetched employee data", async () => {
    const result = await get({ ids: ["5ce77168bcc028f9613019ea"] });

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: "5ce77168bcc028f9613019ea",
        ...commonAttributes,
      })
    );
  });

  it("returns an empty array when mongodb does not find the matching employees", async () => {
    toArray.mockResolvedValue([]);
    const result = await get({ ids: ["6ce77168bcc028f9613019ea"] });
    expect(result).toEqual([]);
  });

  it("returns the count of matching employees", async () => {
    countDocuments.mockResolvedValue(2);
    const result = await count({
      ids: ["5ce77168bcc028f9613019ea", "6ce77168bcc028f9613019ea"],
    });

    expect(countDocuments).toHaveBeenCalledTimes(1);
    expect(countDocuments).toHaveBeenNthCalledWith(1, {
      _id: {
        $in: [
          new ObjectId("5ce77168bcc028f9613019ea"),
          new ObjectId("6ce77168bcc028f9613019ea"),
        ],
      },
    });

    expect(result).toEqual(2);
  });
});
