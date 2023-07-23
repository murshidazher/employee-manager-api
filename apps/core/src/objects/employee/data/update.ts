import { ObjectId } from "mongodb";

import constants from "core/constants";
import dbs from "core/dbs";

import { type EmployeePayload } from "../types";

const update = async (
  id: string,
  payload: Partial<EmployeePayload>
): Promise<{ modifiedCount: number }> => {
  const now = new Date();
  const updates = {
    ...payload,
    updatedAt: now,
  };

  const { modifiedCount } = await dbs.mongo.db
    .collection(constants.collectionNames.employees)
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updates,
      }
    );

  return { modifiedCount };
};

export default update;
