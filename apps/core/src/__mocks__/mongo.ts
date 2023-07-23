// mock all mongodb collection methods
const countDocuments = jest.fn();
const insertOne = jest.fn();
const findOneAndUpdate = jest.fn();
const findOne = jest.fn();
const find = jest.fn();
const sort = jest.fn();
const toArray = jest.fn();
const distinct = jest.fn();
const aggregate = jest.fn();
const bulkWrite = jest.fn();
const deleteMany = jest.fn();
const updateOne = jest.fn();

// mock all cursor pagination methods
const findPaginated = jest.fn();
const aggregatePaginated = jest.fn();

// transaction mock
const withTransaction = jest.fn();

const collection = jest.fn((_collectionName: string) => ({
  countDocuments,
  insertOne,
  findOneAndUpdate,
  findOne,
  deleteMany,
  updateOne,
  find,
  sort,
  distinct,
  aggregate,
  bulkWrite,
}));

const mockMongoClient = {
  findPaginated,
  aggregatePaginated,
  withTransaction,
  db: {
    collection,
  },
};

const mockMongo = (): any => mockMongoClient;

jest.doMock("core/dbs/mongodb", () => mockMongo);

export {
  mockMongoClient,
  mockMongo,
  findPaginated,
  withTransaction,
  deleteMany,
  aggregatePaginated,
  collection,
  countDocuments,
  insertOne,
  findOneAndUpdate,
  findOne,
  find,
  distinct,
  bulkWrite,
  updateOne,
  sort,
  toArray,
};
