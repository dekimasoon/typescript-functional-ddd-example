import type { PlanProps } from "@/domain/object/plan"
import type { UserProps } from "@/domain/object/user"

export type PlanDomainPort = {
  hasDraftPlan: (input: { userId: UserProps["id"] }) => Promise<boolean>
  hasOverlappingPlan: (input: {
    userId: UserProps["id"]
    period: PlanProps["period"]
  }) => Promise<boolean>
}
