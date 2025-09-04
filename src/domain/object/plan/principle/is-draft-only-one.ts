import type { AsyncGuard, PortInput } from "@/domain/domain-util"
import type { PlanDomainPort } from "@/domain/object/plan"

export const isDraftOnlyOneGuard: AsyncGuard<
  PortInput<NoOverlappingPeriodGuardPort["hasDraftPlan"]>,
  NoOverlappingPeriodGuardPort
> = (port) => async (input) => {
  return !(await port.hasDraftPlan(input))
}

export type NoOverlappingPeriodGuardPort = Pick<PlanDomainPort, "hasDraftPlan">
