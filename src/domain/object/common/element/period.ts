import z from "zod"

export const period = z.object({
  startDate: z.date(),
  endDate: z.date(),
})

export type Period = z.infer<typeof period>
