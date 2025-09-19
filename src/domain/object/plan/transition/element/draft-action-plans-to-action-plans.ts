import type { Transition } from "@/domain/domain-util"
import { transitionDateSettingToDates } from "@/domain/object/common/transition/date-setting-to-dates"
import type { PlanRelations } from "@/domain/object/plan"
import type { PlanDomainPort } from "@/domain/object/plan/plan-domain-port"

export const transitionDraftActionPlansToActionPlans: Transition<
  PlanRelations["draftActionPlan"][],
  PlanRelations["actionPlan"][]
> = (input) => {
  // TODO: impl
  const actionPlan = input[0]
  if (!actionPlan) {
    return []
  }

  const dateList = transitionDateSettingToDates(actionPlan.dateSetting)
  return dateList.map((date) => ({
    date,
    when: actionPlan.when,
    what: actionPlan.what,
    level: actionPlan.level,
    metricId: actionPlan.metricId,
    remindTime: actionPlan.remindTime,
  }))
}

export type DraftPlanPort = Pick<PlanDomainPort, "hasDraftPlan">
