import z from "zod"
import { dayOfWeek } from "@/domain/object/common/element/day-of-week"

export const dateSetting = z.union([
  z.object({
    type: z.literal("EVERY_DAY"),
  }),
  z.object({
    type: z.literal("WEEKDAYS"),
  }),
  z.object({
    type: z.literal("WEEKENDS_AND_HOLIDAYS"),
  }),
  z.object({
    type: z.literal("SELECTED_DAY_OF_WEEK"),
    dayOfWeek,
  }),
])

export type DateSetting = z.infer<typeof dateSetting>
