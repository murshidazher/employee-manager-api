import path from "node:path";

import fs from "fs-extra";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryReplSet } from "mongodb-memory-server-core/lib/MongoMemoryReplSet";

import testConfigs from "../configs";
import generateJestGlobalConfigFilename from "./generate-jest-global-config-filename";

// create the database
const createTestMongoDatabase = async (jestTempDir: string): Promise<void> => {
  const globalJestConfigPath = path.join(
    jestTempDir,
    generateJestGlobalConfigFilename("mongo")
  );

  // create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryReplSet.create(
    testConfigs.mongodbMemoryServerOptions
  );

  await mongod.waitUntilRunning();

  // construct the uri
  const uri = new URL(mongod.getUri());
  const dbName = testConfigs.mongodbMemoryServerOptions.replSet?.dbName ?? "";
  const additionalParams = "retryWrites=false&ssl=false";
  const paramSymbol = uri.search ? "&" : "?";

  const mongoUrl = `${uri.protocol}//${uri.hostname}:${uri.port}/${dbName}${uri.search}${paramSymbol}${additionalParams}`;

  const mongoConfig = {
    mongo: {
      url: mongoUrl,
      db: dbName,
    },
  };

  // write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalJestConfigPath, JSON.stringify(mongoConfig));

  process.env.MONGO_URL = mongoConfig.mongo.url;
  process.env.MONGO_DB_NAME = mongoConfig.mongo.db;

  // set reference to mongod in order to close the server during teardown.
  global.memoryMongoDb = mongod;
};

export default createTestMongoDatabase;
