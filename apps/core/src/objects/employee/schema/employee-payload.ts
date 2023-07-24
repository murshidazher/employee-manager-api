import { z } from "zod";

const EmployeePayloadSchema = z.object({
  firstName: z.string().regex(/^[A-Za-z]{6,10}$/, {
    message:
      "Should only consist alphabets, min 6 characters, max 10 characters",
  }),
  lastName: z.string().regex(/^[A-Za-z]{6,10}$/, {
    message:
      "Should only consist alphabets, min 6 characters, max 10 characters",
  }),
  number: z.string().regex(/^(\+94|0)(7\d{8})$/, {
    message: "Should be a valid LK number starting with +94|07",
  }),
  email: z.string().email({ message: "Should be a valid email" }),
  gender: z.string().refine((val) => val === "M" || val === "F", {
    message: "Gender should be 'M' or 'F'.",
  }),
});

export default EmployeePayloadSchema;
