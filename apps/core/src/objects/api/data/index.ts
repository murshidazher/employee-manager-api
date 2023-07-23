import version from "./version";

export type Data = {
  version: () => string;
}

const data: Data = {
  version,
};

export default data;
