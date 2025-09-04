import z from "zod"
import type { Transition } from "@/domain/domain-util"
import { transitionDraftPeriodToPeriod } from "@/domain/object/common/transition/draft-period-to-period"
import type { PlanDomainPort } from "@/domain/object/plan/plan-domain-port"
import { getPlanId } from "@/domain/object/plan/plan-schema"
import { periodNonOverlappingGuard } from "@/domain/object/plan/principle/period-non-overlapping"
import {
  type ActivePlan,
  activePlanSchema,
} from "@/domain/object/plan/state/active-plan"
import type { DraftPlan } from "@/domain/object/plan/state/draft-plan"
import { transitionDraftActionPlansToActionPlans } from "@/domain/object/plan/transition/element/draft-action-plans-to-action-plans"
import { transitionDraftRemindersReminders } from "@/domain/object/plan/transition/element/draft-reminders-to-reminders"

export const transitionDraftPlanToActivePlan: Transition<
  {
    userId: string
    draftPlan: DraftPlan
  },
  ActivePlan,
  TransitionDraftPlanToActivePlan
> = (port) => async (input) => {
  const period = transitionDraftPeriodToPeriod({
    draftPeriod: input.draftPlan.draftPeriod,
    config: {
      normalDays: 7,
      minDays: 3,
      maxDays: 10,
    },
  })
  const periodNonOverlapping = await periodNonOverlappingGuard(port)({
    userId: input.userId,
    period,
  })
  if (!periodNonOverlapping) {
    throw new Error("period is overlapping")
  }

  const actionPlans = transitionDraftActionPlansToActionPlans(
    input.draftPlan.draftActionPlans,
  )
  const reminders = transitionDraftRemindersReminders(
    input.draftPlan.draftReminders,
  )
  return z.parse(activePlanSchema, {
    id: getPlanId(),
    goal: input.draftPlan.goal,
    period,
    actionPlans,
    reminders,
  })
}

export type TransitionDraftPlanToActivePlan = Pick<
  PlanDomainPort,
  "hasOverlappingPlan"
>
