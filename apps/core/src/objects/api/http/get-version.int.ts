import status from "http-status";
import * as pkg from "package";

import api from "tests/api";

describe("objects.api.http.getVersion()", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  describe("GET /", () => {
    it("should get a 200 response with version", async () => {
      const response = await api.requestHttp("/v1/version", "get", {});

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual({
        version: pkg.version,
      });
    });
  });
});
