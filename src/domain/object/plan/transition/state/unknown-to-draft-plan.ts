import z from "zod"
import type { Transition } from "@/domain/domain-util"
import type { PlanDomainPort } from "@/domain/object/plan/plan-domain-port"
import { isDraftOnlyOneGuard } from "@/domain/object/plan/principle/is-draft-only-one"
import {
  type DraftPlan,
  draftPlanSchema,
} from "@/domain/object/plan/state/draft-plan"

export const transitionUnknownToDraftPlan: Transition<
  {
    userId: string
    rawDraftPlan: unknown
  },
  DraftPlan,
  TransitionUnknownToDraftPlanPort
> = (port) => async (input) => {
  const isOnlyOne = await isDraftOnlyOneGuard(port)({
    userId: input.userId,
  })
  if (!isOnlyOne) {
    throw new Error("is not only one draft plan")
  }
  return z.parse(draftPlanSchema, input.rawDraftPlan)
}

export type TransitionUnknownToDraftPlanPort = Pick<
  PlanDomainPort,
  "hasDraftPlan"
>
