import version from "./version";

export interface Data {
  version: () => string;
}

const data: Data = {
  version,
};

export default data;
