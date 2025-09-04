import { dayOfWeek } from "@/domain/object/common/element/day-of-week"
import z from "zod"

export const draftDate = z.union([
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

export type DraftDate = z.infer<typeof draftDate>
