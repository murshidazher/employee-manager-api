import http from "node:http";

import config from "src/config";

import { handleException } from "server/handlers";
import serverStartup from "server/utils/server-startup";

const bootstrap = async (): Promise<void> => {
  // load the configuration
  config.load();

  const server = await import("./server/index").catch(handleException);

  const { port } = config.data.host;

  const httpServer = http.createServer(await server?.create());
  httpServer.listen(port, serverStartup);
};

void bootstrap();
