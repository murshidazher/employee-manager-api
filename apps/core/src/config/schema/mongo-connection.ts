import { z } from "zod";

const MongoConnectionSchema = z.object({
  url: z.string().url(),
  db: z.string(),
});

export default MongoConnectionSchema;
