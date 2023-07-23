import constants, { type MongodbCollectionName } from "core/constants";

import factories from "./factories";

// using the testable collection name for useability sake
const mongoFactoryName: Record<string, MongodbCollectionName> = {
  EMPLOYEE: constants.collectionNames.employees,
};

const factory = {
  create: (collectionName: MongodbCollectionName) => {
    switch (collectionName) {
      case mongoFactoryName.EMPLOYEE:
        return factories.employee;
      default:
        throw new Error(
          `The mongo collection: ${collectionName} doesn't have a test factory yet.`
        );
    }
  },
};

export default {
  factory,
  mongoFactoryName,
};
