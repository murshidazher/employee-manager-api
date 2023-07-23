import { z } from "zod";

const TestOptionsSchema = z.object({
  tokens: z.object({
    tenant: z.string(),
    admin: z.string(),
    owner: z.string(),
  }),
});

export default TestOptionsSchema;
