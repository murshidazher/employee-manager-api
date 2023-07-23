import { type ObjectId } from "mongodb";

import { type RawEmployee } from "objects/employee/types";

import factories from "../factory/mongo/factories";
import { type BaseModel } from "../factory/mongo/utils/model";

class Employee {
  private readonly employee: BaseModel<Partial<RawEmployee>>;

  constructor(employee: BaseModel<Partial<RawEmployee>>) {
    this.employee = employee;
  }

  static initialize = async (
    attrs?: Partial<RawEmployee>
  ): Promise<Employee> => {
    const employee = factories.employee.build(attrs);
    await employee.save();
    return new Employee(employee);
  };

  getId = (): ObjectId | undefined => this.employee.id;

  getName = (): string =>
    `${this.employee.attrs?.firstName} ${this.employee.attrs?.lastName}`;

  getEmployee = (): Partial<RawEmployee> | undefined => this.employee.attrs;

  update = async (
    updates: Partial<RawEmployee>
  ): Promise<Partial<RawEmployee>> => {
    await this.employee.update({ $set: updates });
    return {
      ...this.employee.attrs,
      ...updates,
    };
  };

  destroy = async (): Promise<void> => {
    await this.employee.destroy();
  };
}

export default Employee;
