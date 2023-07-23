import { type z } from "zod";

import type MongoConnectionSchema from "../schema/mongo-connection";

export type MongoConnection = z.infer<typeof MongoConnectionSchema>;
