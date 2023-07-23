import status from "http-status";

import api from "tests/api";

describe("api.http.getVersion()", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  describe("GET /", () => {
    it("should get the flag from the cookie with 200 response", async () => {
      const response = await api
        .requestHttp("/v1/version", "get", {});

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual("");
    });
  });
});
