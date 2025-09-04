import z from "zod"
import { draftDate } from "@/domain/object/common/element/draft-date"
import { planReminder } from "@/domain/object/plan/element/plan-reminder"

export const planDraftReminder = z.object({
  draftDate,
  name: planReminder.shape.name,
  time: planReminder.shape.time,
})
