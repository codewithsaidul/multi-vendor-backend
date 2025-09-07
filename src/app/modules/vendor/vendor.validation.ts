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



export const updateVendorInfoSchema = z.object({
  name: z.string("name must be string").nonempty("name is required").trim().min(3, { message: "name must be at least 3 characters long" }),
});


export const updateVendorStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});
