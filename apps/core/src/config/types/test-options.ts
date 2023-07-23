import { type z } from "zod";

import type TestOptionsSchema from "../schema/test-options";

export type TestOptions = z.infer<typeof TestOptionsSchema>;
