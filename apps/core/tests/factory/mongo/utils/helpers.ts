import { type MongodbCollectionName } from "core/constants";
import dbs from "core/dbs";

const dropCollection = async (name: MongodbCollectionName): Promise<void> => {
  try {
    await dbs.mongo.db.collection(name).drop();
  } catch (e) {
    // could fail if the collection didn't exist
  }
};

const dropCollections = async (
  ...names: MongodbCollectionName[]
): Promise<void> => {
  await Promise.all(names.map(dropCollection));
};

export { dropCollection, dropCollections };
