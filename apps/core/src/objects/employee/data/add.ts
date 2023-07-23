import { getRandomNumber } from "@murshidazher/employee-manager-api-utilities";

import constants from "core/constants";
import dbs from "core/dbs";

import {
  type Employee,
  type EmployeePayload,
  type RawEmployee,
} from "../types";
import convert from "./convert";

const add = async (payload: EmployeePayload): Promise<Employee> => {
  const now = new Date();
  const photo = `https://randomuser.me/api/portraits/men/${getRandomNumber(
    1,
    99
  )}.jpg`;
  const doc = {
    ...payload,
    photo,
    createdAt: now,
    updatedAt: now,
  };

  const { insertedId } = await dbs.mongo.db
    .collection(constants.collectionNames.employees)
    .insertOne(doc);

  const employee = (await dbs.mongo.db
    .collection(constants.collectionNames.employees)
    .findOne({ _id: insertedId })) as RawEmployee;

  return convert(employee);
};

export default add;
