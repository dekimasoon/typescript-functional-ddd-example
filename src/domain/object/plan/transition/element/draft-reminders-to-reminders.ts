import type { Transition } from "@/domain/domain-util"
import { transitionDateSettingToDates } from "@/domain/object/common/transition/date-setting-to-dates"
import type { PlanRelations } from "@/domain/object/plan"
import type { PlanDomainPort } from "@/domain/object/plan/plan-domain-port"

export const transitionDraftRemindersReminders: Transition<
  PlanRelations["draftReminder"][],
  PlanRelations["reminder"][]
> = (input) => {
  // TODO: impl
  const reminder = input[0]
  if (!reminder) {
    return []
  }

  const dateList = transitionDateSettingToDates(reminder.dateSetting)
  return dateList.map((date) => ({
    date,
    name: reminder.name,
    time: reminder.time,
  }))
}

export type DraftPlanPort = Pick<PlanDomainPort, "hasDraftPlan">
