import { mockMongoClient } from "./mongo";

const dbs = {
  mongo: mockMongoClient,
};

// mock db connect calls
jest.mock("core/dbs", () => dbs);

export { dbs };
