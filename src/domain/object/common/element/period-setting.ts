import z from "zod"
import { dayOfWeek } from "@/domain/object/common/element/day-of-week"

export const periodSetting = z.union([
  z.object({
    type: z.literal("AUTO"),
  }),
  z.object({
    type: z.literal("SELECTED_END_DAY_OF_WEEK"),
    dayOfWeek,
  }),
])

export type PeriodSetting = z.infer<typeof periodSetting>
