import config from "src/config";

import dbs from "core/dbs";

import seedTestDatabase from "./seeds";

beforeAll(async () => {
  config.load();
  config.validate();

  await dbs.mongo.connect();

  // test seeds
  await seedTestDatabase();
});

afterAll(async () => {
  await dbs.mongo.db.dropDatabase();

  // close open handles
  await dbs.mongo.close().catch();
});
