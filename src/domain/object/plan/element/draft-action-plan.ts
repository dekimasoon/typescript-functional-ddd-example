import z from "zod"
import { dateSetting } from "@/domain/object/common/element/date-setting"
import { actionPlan } from "@/domain/object/plan/element/action-plan"

export const draftActionPlan = z.object({
  dateSetting,
  when: actionPlan.shape.when,
  what: actionPlan.shape.what,
  level: actionPlan.shape.level,
  metricId: actionPlan.shape.metricId,
  remindTime: actionPlan.shape.remindTime,
})
