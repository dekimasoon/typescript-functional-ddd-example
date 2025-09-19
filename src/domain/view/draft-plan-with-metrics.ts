import type { SimplifyDeep } from "type-fest"
import type { DraftMetric } from "@/domain/object/metric"
import type { PlanProps, PlanRelations } from "@/domain/object/plan"

export type DraftPlanWithMetric = SimplifyDeep<{
  goal: PlanProps["goal"]
  periodSetting: PlanProps["periodSetting"]
  draftActionPlans: DraftActionPlanWithMetric[]
  draftReminders: PlanRelations["draftReminder"][]
}>

type DraftActionPlanWithMetric = PlanRelations["draftActionPlan"] & {
  metirc: DraftMetric
}
