import {
  type Employee,
  type EmployeePayload,
  type EmployeeQuery,
} from "../types";
import add from "./add";
import get from "./get";
import remove from "./remove";
import update from "./update";

export interface Data {
  add: (payload: EmployeePayload) => Promise<Employee>;
  get: (args: EmployeeQuery) => Promise<Employee[]>;
  remove: (ids: string[]) => Promise<{ deletedCount: number }>;
  update: (
    id: string,
    payload: EmployeePayload
  ) => Promise<{ modifiedCount: number }>;
}

const data: Data = {
  add,
  get,
  remove,
  update,
};

export default data;
