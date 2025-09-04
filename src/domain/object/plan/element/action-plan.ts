import z from "zod"
import { time } from "@/domain/object/common/element/time"
import { metricProps } from "@/domain/object/metric"

export const actionPlan = z.object({
  date: z.date(),
  when: z.string().max(64),
  what: z.string().max(128),
  level: z.enum(["BASELINE", "STRETCH"]),
  metricId: metricProps.id,
  remindTime: z.nullable(time),
})
