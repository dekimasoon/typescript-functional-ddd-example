import z from "zod"
import { dateSetting } from "@/domain/object/common/element/date-setting"
import { planReminder } from "@/domain/object/plan/element/plan-reminder"

export const planDraftReminder = z.object({
  dateSetting,
  name: planReminder.shape.name,
  time: planReminder.shape.time,
})
