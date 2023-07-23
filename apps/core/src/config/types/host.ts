import { type z } from "zod";

import type HostSchema from "../schema/host";

export type Host = z.infer<typeof HostSchema>;
