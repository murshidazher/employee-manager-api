/**
 * This script will seed employees to the mongodb database.
 *
 * Command to run
 * --------------
 * npm run script:one-off seed-employees
 */
import constants from "core/constants";

import employees from "./data/employees.json";
import Script from "./script";

const snakeToCamel = (snakeStr: string): string => {
  const components = snakeStr.split("_");
  return (
    components[0] +
    components
      .slice(1)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join("")
  );
};

/**
 * Convert the given snake-case object to camel case.
 * @param snakeObj The object with snake-case keys
 * @returns the normalized camel-case object
 */
const snakeToCamelKeys = (
  snakeObj: Record<string, any>
): Record<string, any> => {
  const camelObj: Record<string, any> = {};
  for (const key in snakeObj) {
    if (Object.prototype.hasOwnProperty.call(snakeObj, key)) {
      const camelKey = snakeToCamel(key);
      camelObj[camelKey] = snakeObj[key];
    }
  }
  return camelObj;
};

class SeedEmployees extends Script {
  handle = async (): Promise<void> => {
    const { logger } = this;

    logger.info(`Starting the script to seed employees.`);

    const mongo = await this.connectMongo();

    if (!mongo) return;

    const now = new Date();

    const collection = mongo.db.collection(constants.collectionNames.employees);

    for (let i = 0; i < employees.length; i++) {
      const { id, ...payload } = employees[i];

      const normalizedPayload = {
        ...snakeToCamelKeys(payload),
        createdAt: now,
        updatedAt: now,
      };

      await collection.findOneAndUpdate(
        {
          email: payload.email,
        },
        {
          $set: normalizedPayload,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );
    }

    logger.info(`Successfully seeded the employees.`);
  };
}

export default SeedEmployees;
