import z from "zod"

export const metricRecord = z.object({
  id: z.string(),
  value: z.string(),
  createdAt: z.date(),
})
