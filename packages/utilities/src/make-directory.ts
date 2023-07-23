import fs from "fs-extra";

export const makeDirectory = (path: any): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
