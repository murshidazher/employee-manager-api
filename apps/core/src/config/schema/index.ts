import { z } from "zod";

import HostSchema from "./host";
import MongoConnectionSchema from "./mongo-connection";
import TestOptionsSchema from "./test-options";

const EnvConfigSchema = z.object({
  name: z.string(),
  serviceName: z.string(),
  version: z.string(),
  environment: z.string(),
  host: HostSchema,
  mongo: MongoConnectionSchema,
  test: TestOptionsSchema,
});

const validate = (args: any): boolean =>
  EnvConfigSchema.safeParse(args).success;

export default { EnvConfigSchema, validate };
