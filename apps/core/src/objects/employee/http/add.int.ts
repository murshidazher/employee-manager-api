import status from "http-status";

import api from "tests/api";

describe("objects.employee.http.add()", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  describe("POST /", () => {
    it("should add the employee withe the given payload and returns a 200 response", async () => {
      const response = await api.requestHttp("/v1/employee", "post", {
        firstName: "Henri",
        lastName: "Rodriguez",
        email: "Darrin_Rippin@gmail.com",
        number: "+94771277218",
        gender: "M",
      });

      expect(response.statusCode).toEqual(status.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          createdAt: expect.any(String),
          email: "Darrin_Rippin@gmail.com",
          firstName: "Henri",
          gender: "M",
          lastName: "Rodriguez",
          number: "+94771277218",
          photo: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
  });
});
