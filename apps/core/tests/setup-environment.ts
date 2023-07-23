import config from "src/config";

import dbs from "core/dbs";
import { logger } from "core/logger";

import seedTestDatabase from "./seeds";

beforeAll(async () => {
  config.load();
  config.validate();

  await dbs.mongo.connect();

  // test seeds
  await seedTestDatabase(logger);
});

afterAll(async () => {
  await dbs.mongo.db.dropDatabase();
});
