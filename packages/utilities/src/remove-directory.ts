import fs from "fs-extra";

export const removeDirectory = (path: any): void => {
  if (fs.existsSync(path)) {
    fs.removeSync(path);
  }
};
