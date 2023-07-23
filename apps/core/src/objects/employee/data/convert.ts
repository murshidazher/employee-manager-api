import { type Employee, type RawEmployee } from "objects/employee/types";

const convert = (raw: RawEmployee): Employee => {
  const { _id, ...rest } = raw;

  return {
    id: _id.toString(),
    ...rest,
  };
};

export default convert;
