import z from "zod"
import type { Transition } from "@/domain/domain-util"
import type { MetricDomainPort } from "@/domain/object/metric/metric-domain-port"
import { nameUniqueGuard } from "@/domain/object/metric/principle/name-unique"
import {
  type DraftMetric,
  draftMetricSchema,
} from "@/domain/object/metric/state/draft-metric"

export const transitionUnknownToDraftMetric: Transition<
  {
    userId: string
    rawDraftMertic: unknown
  },
  DraftMetric,
  TransitionUnknownToDraftMetric
> = (port) => async (input) => {
  const parsedDraftPlan = z.parse(draftMetricSchema, input.rawDraftMertic)
  const isNameUnique = await nameUniqueGuard(port)({
    userId: input.userId,
    name: parsedDraftPlan.name,
  })
  if (!isNameUnique) {
    throw new Error("name is not unique")
  }
  return parsedDraftPlan
}

export type TransitionUnknownToDraftMetric = Pick<
  MetricDomainPort,
  "hasSameNameMetric"
>
