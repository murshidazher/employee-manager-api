// mock all db calls for unit test

import "src/__mocks__/dbs";

beforeAll(async () => {});

afterAll(async () => {
  jest.clearAllMocks();
});
