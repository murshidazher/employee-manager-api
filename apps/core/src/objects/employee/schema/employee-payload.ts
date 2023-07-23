import { z } from "zod";

const EmployeePayloadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().regex(/^[A-Za-z]{6,10}$/), // Only alphabets, min 6 characters, max 10 characters
  lastName: z.string().regex(/^[A-Za-z]{6,10}$/), // Only alphabets, min 6 characters, max 10 characters
  number: z.string().regex(/^(\+94|0)(7\d{8})$/), // LK phone number validation
  gender: z.string().refine((val) => val === "M" || val === "F", {
    message: "Gender should be 'M' or 'F'.",
  }),
});

export default EmployeePayloadSchema;
