import z from "zod";





export const assignManagerSchema = z.object({
  scopeId: z.string().min(1, "Scope ID is required"),
});
