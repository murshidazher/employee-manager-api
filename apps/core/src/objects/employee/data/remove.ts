import { ObjectId } from "mongodb";

import constants from "core/constants";
import dbs from "core/dbs";

const remove = async (ids: string[]): Promise<{ deletedCount: number }> => {
  const doc = {
    _id: { $in: ids.map((id) => new ObjectId(id)) },
  };

  const { deletedCount } = await dbs.mongo.db
    .collection(constants.collectionNames.employees)
    .deleteMany(doc);

  return { deletedCount };
};

export default remove;
