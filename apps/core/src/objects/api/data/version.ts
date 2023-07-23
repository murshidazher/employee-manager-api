import config from "src/config";

const version = (): string => config.data.version;

export default version;
