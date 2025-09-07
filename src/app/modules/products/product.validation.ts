import { z } from "zod";

export const createProductValidationSchema = z.object({
  title: z
    .string({ message: "Title must be a string." })
    .nonempty({ message: "Title is required." })
    .min(3, { message: "Title must be contain at least 3 characters." }),

  price: z
    .number({ message: "Price must be a number." })
    .positive({ message: "Price must be a positive number." }),

  stock: z
    .number({ message: "Stock must be a number." })
    .int({ message: "Stock must be a whole number." })
    .nonnegative({ message: "Stock cannot be a negative number." }),

  vendorId: z.string().optional(),
});
