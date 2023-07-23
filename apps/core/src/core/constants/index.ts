const MONGODB_COLLECTION_NAMES = [
  "employees",
] as const;

type MongodbCollectionName = (typeof MONGODB_COLLECTION_NAMES)[number];
const collectionNames: {
  [key in MongodbCollectionName]: key;
} = Object.assign(
  {},
  ...MONGODB_COLLECTION_NAMES.map((collection: MongodbCollectionName) => ({
    [collection]: `${collection}`,
  }))
  );

const constants = {
  collectionNames,
};

export type {
  MongodbCollectionName,
};

export default constants;
