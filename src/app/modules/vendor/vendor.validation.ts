import { z } from "zod";

export const createVendorSchema = z.object({
  name: z
    .string("name must be a string")
    .nonempty("Vendor name is required")
    .trim()
    .min(3, { message: "Vendor name must be at least 3 characters long" }),

  status: z
    .enum(["pending", "approved", "rejected"])
    .optional()
});
