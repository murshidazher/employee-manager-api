// eslint-disable-next-line import/no-extraneous-dependencies
import { type MongoMemoryReplSetOpts } from "mongodb-memory-server-core/lib/MongoMemoryReplSet";

/**
 * Options for MongoMemoryServer
 * More: https://github.com/nodkz/mongodb-memory-server#available-options-for-mongomemoryreplset
 */
const mongodbMemoryServerOptions: Partial<MongoMemoryReplSetOpts> = {
  binary: {
    version: "6.0.3",
    checkMD5: true,
  },
  replSet: {
    count: 1,
    dbName: `${process.env.BUILD_NUMBER ?? "test"}_${Math.floor(
      Math.random() * 100000
    )}`,
    storageEngine: "wiredTiger",
  },
};

export default mongodbMemoryServerOptions;
