import z from "zod"
import { transitionUnknownToDraftMetric } from "@/domain/object/metric"
import {
  type PlanProps,
  planProps,
  transitionUnknownToDraftPlan,
} from "@/domain/object/plan"
import type { MetricImplPort } from "@/usecase/port/metric-impl-port"
import type { PlanImplPort } from "@/usecase/port/plan-impl-port"
import type { Command, CommandImpl } from "@/usecase/usecase-util"

export type RequestDraftPlanAndMetricsCommand = Command<
  z.infer<typeof requestDraftPlanAndMetricsInput>,
  PlanProps["id"]
>

export const requestDraftPlanAndMetricsInput = z.object({
  userId: planProps.id,
  outline: z.string().max(256),
})

export const requestDraftPlanAndMetricsImpl: CommandImpl<
  RequestDraftPlanAndMetricsCommand,
  Port
> = (port, _ctx) => async (input) => {
  const currentMetics = await port.queryMetrics({ userId: input.userId })
  const { rawDraftPlan, rawDraftMetrics } =
    await port.generateRawDraftPlanAndMetrics({
      ...input,
      currentMetics,
    })
  const draftMetrics = await Promise.all(
    rawDraftMetrics.map((x) =>
      transitionUnknownToDraftMetric(port)({
        userId: input.userId,
        rawDraftMertic: x,
      }),
    ),
  )
  const draftPlan = await transitionUnknownToDraftPlan(port)({
    userId: input.userId,
    rawDraftPlan,
  })
  await port.persisteDraftMetrics({
    userId: input.userId,
    draftMetrics,
  })
  const draftPlanId = await port.persisteDraftPlan({
    userId: input.userId,
    draftPlan,
  })
  return draftPlanId
}

type Port = Pick<
  PlanImplPort & MetricImplPort,
  | "queryMetrics"
  | "generateRawDraftPlanAndMetrics"
  | "hasSameNameMetric"
  | "hasDraftPlan"
  | "persisteDraftPlan"
  | "persisteDraftMetrics"
>
