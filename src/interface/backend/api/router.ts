import { generateRawDraftPlanAndMetrics } from "@/infrastructure/openai/plan-openai-adapter"
import {
  hasSameNameMetric,
  persisteDraftMetrics,
  queryMetrics,
} from "@/infrastructure/prisma/adapter/metric-prisma-adapter"
import {
  getDraftPlanWithMetrics,
  hasDraftPlan,
  persisteDraftPlan,
} from "@/infrastructure/prisma/adapter/plan-prisma-adapter"
import { base } from "@/interface/backend/api/orpc"
import {
  requestDraftPlanAndMetricsImpl,
  requestDraftPlanAndMetricsInput,
} from "@/usecase/command/plan/request-draft-plan-and-metrics"
import { getDraftPlanWithMetricsQueryImpl } from "@/usecase/query/get-draft-plan-with-metrics"

export const router = {
  command: {
    plan: {
      requestDraftPlanAndMetrics: base
        .input(requestDraftPlanAndMetricsInput.pick({ outline: true }))
        .handler(({ input, context }) => {
          return requestDraftPlanAndMetricsImpl(
            {
              queryMetrics: queryMetrics(context),
              generateRawDraftPlanAndMetrics:
                generateRawDraftPlanAndMetrics(context),
              hasSameNameMetric: hasSameNameMetric(context),
              hasDraftPlan: hasDraftPlan(context),
              persisteDraftPlan: persisteDraftPlan(context),
              persisteDraftMetrics: persisteDraftMetrics(context),
            },
            context,
          )({ ...input, userId: context.session.userId })
        }),
    },
  },
  query: {
    requestDraftPlanAndMetrics: base.handler(({ context }) => {
      return getDraftPlanWithMetricsQueryImpl(
        {
          getDraftPlanWithMetrics: getDraftPlanWithMetrics(context),
        },
        context,
      )({ userId: context.session.userId })
    }),
  },
}
