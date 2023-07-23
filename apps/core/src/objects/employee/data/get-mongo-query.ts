import { ObjectId, type Filter } from "mongodb";

import { type EmployeeQuery, type RawEmployee } from "objects/employee/types";

const getMongoQuery = async (
  args: EmployeeQuery
): Promise<Filter<RawEmployee>> => {
  const mongoQuery: Filter<RawEmployee> = {};
  if (args?.ids?.length) {
    mongoQuery._id = {
      $in: args.ids.map((id: string) => new ObjectId(id)),
    };
  }

  return mongoQuery;
};

export default getMongoQuery;
