import type { UserProps } from "@/domain/object/user"
import type { PlanImplPort } from "@/usecase/port/plan-impl-port"
import type { Query, QueryImpl } from "@/usecase/usecase-util"
import type { DraftPlanWithMetric } from "@/usecase/view/draft-plan-with-metrics"

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
