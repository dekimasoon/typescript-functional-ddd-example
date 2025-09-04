import z from "zod"
import { metricProps } from "@/domain/object/metric/metric-schema"

export const draftMetricSchema = z.object({
  id: metricProps.id,
  name: metricProps.name,
  type: metricProps.type,
})

export type DraftMetric = z.infer<typeof draftMetricSchema>
