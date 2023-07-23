import Chance from "chance";
import { ObjectId } from "mongodb";

import { type RawEmployee } from "src/objects/employees/types";

import mongoFactoryConstants from "tests/factory/mongo/constants";
import { BaseModel } from "tests/factory/mongo/utils/model";

import constants from "core/constants";

const chance = new Chance();

const employee = (overrides?: Partial<RawEmployee>): Partial<RawEmployee> => ({
  _id: new ObjectId(),
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email(),
  number: chance.country() + chance.phone({ formatted: false }),
  photo: `https://randomuser.me/api/portraits/men/${chance.integer({
    min: 1,
    max: 99
  })}.jpg`,
  gender: chance.gender(),
  createdAt: mongoFactoryConstants.DEFAULT_DATE,
  updatedAt: mongoFactoryConstants.DEFAULT_DATE,
  ...overrides,
});

export default {
  build: (overrides?: Partial<RawEmployee>) =>
    new BaseModel<Partial<RawEmployee>>(constants.collectionNames.employees, () =>
      employee(overrides)
    ),
};
