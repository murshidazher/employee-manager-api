import process from "node:process";

import handleException from "server/handlers/exception";

process.once("uncaughtException", handleException);
process.once("unhandledRejection", handleException);
