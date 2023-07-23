// mock config
const config = {
  data: {
    version: "v0.1.0",
  },
};

// mock config
jest.mock("src/config", () => config);

export { config };
