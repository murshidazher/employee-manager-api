import { type z } from "zod";

import type schema from "../schema";

export type EmployeePayload = z.infer<typeof schema.EmployeePayloadSchema>;
