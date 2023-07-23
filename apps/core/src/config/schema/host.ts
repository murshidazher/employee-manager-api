import { z } from "zod";

const HostSchema = z.object({
  protocol: z.string(),
  hostname: z.string(),
  port: z.number(),
});

export default HostSchema;
