import z from "zod"
import { time } from "@/domain/object/common/element/time"

export const planReminder = z.object({
  name: z.string(),
  date: z.date(),
  time,
})
