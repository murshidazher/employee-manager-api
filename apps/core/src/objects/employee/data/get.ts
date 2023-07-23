import { type Sort } from "mongodb";

import constants from "core/constants";
import dbs from "core/dbs";

import {
  type Employee,
  type EmployeeQuery,
  type RawEmployee,
} from "objects/employee/types";

import convert from "./convert";
import getMongoQuery from "./get-mongo-query";
import getSortOption from "./get-sort-option";

const get = async (args: EmployeeQuery): Promise<Employee[]> => {
  const mongoQuery = await getMongoQuery(args);
  const sortOptions: Sort = {
    createdAt: -1,
    ...(args.sort && getSortOption(args.sort)),
  };

  const users = await dbs.mongo.db
    .collection<RawEmployee>(constants.collectionNames.employees)
    .find(mongoQuery)
    .sort(sortOptions)
    .toArray();

  return await Promise.all(users.map(convert));
};

const count = async (args: EmployeeQuery): Promise<number> => {
  const mongoQuery = await getMongoQuery(args);
  return await dbs.mongo.db
    .collection(constants.collectionNames.employees)
    .countDocuments(mongoQuery);
};

export default get;
export { count };
