import type { MetricProps } from "@/domain/object/metric"
import type { DraftPlan, PlanDomainPort, PlanProps } from "@/domain/object/plan"
import type { RequestDraftPlanAndMetricsCommand } from "@/usecase/command/plan/request-draft-plan-and-metrics"
import type { GetDraftPlanWithMetricsQuery } from "@/usecase/query/get-draft-plan-with-metrics"

export type PlanImplPort = PlanDomainPort & {
  generateRawDraftPlanAndMetrics: GenerateRawDraftPlanAndMetrics
  persisteDraftPlan: PersisteDraftPlan
  getDraftPlanWithMetrics: GetDraftPlanWithMetrics
}

type GenerateRawDraftPlanAndMetrics = (
  input: RequestDraftPlanAndMetricsCommand["input"] & {
    currentMetics: MetricProps[]
  },
) => Promise<{ rawDraftPlan: unknown; rawDraftMetrics: unknown[] }>

type PersisteDraftPlan = (input: {
  userId: string
  draftPlan: DraftPlan
}) => Promise<PlanProps["id"]>

type GetDraftPlanWithMetrics = (
  input: GetDraftPlanWithMetricsQuery["input"],
) => Promise<GetDraftPlanWithMetricsQuery["output"]>
