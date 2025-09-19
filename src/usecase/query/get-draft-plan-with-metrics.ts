import type { UserProps } from "@/domain/object/user"
import type { DraftPlanWithMetric } from "@/domain/view/draft-plan-with-metrics"
import type { PlanImplPort } from "@/usecase/port/plan-impl-port"
import type { Query, QueryImpl } from "@/usecase/usecase-util"

export type GetDraftPlanWithMetricsQuery = Query<
  { userId: UserProps["id"] },
  DraftPlanWithMetric
>

export const getDraftPlanWithMetricsQueryImpl: QueryImpl<
  GetDraftPlanWithMetricsQuery,
  Port
> = (port, _ctx) => async (input) => {
  return port.getDraftPlanWithMetrics(input)
}

type Port = Pick<PlanImplPort, "getDraftPlanWithMetrics">
