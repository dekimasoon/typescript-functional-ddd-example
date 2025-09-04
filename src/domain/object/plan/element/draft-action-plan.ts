import z from "zod"
import { draftDate } from "@/domain/object/common/element/draft-date"
import { actionPlan } from "@/domain/object/plan/element/action-plan"

export const draftActionPlan = z.object({
  draftDate,
  when: actionPlan.shape.when,
  what: actionPlan.shape.what,
  level: actionPlan.shape.level,
  metricId: actionPlan.shape.metricId,
  remindTime: actionPlan.shape.remindTime,
})
