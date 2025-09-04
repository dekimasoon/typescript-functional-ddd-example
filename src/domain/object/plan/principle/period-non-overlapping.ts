import type { AsyncGuard, PortInput } from "@/domain/domain-util"
import type { PlanDomainPort } from "@/domain/object/plan"

export const periodNonOverlappingGuard: AsyncGuard<
  PortInput<NoOverlappingPeriodGuardPort["hasOverlappingPlan"]>,
  NoOverlappingPeriodGuardPort
> = (port) => async (input) => {
  return !(await port.hasOverlappingPlan(input))
}

export type NoOverlappingPeriodGuardPort = Pick<
  PlanDomainPort,
  "hasOverlappingPlan"
>
